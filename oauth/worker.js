export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Allow Decap to reach this worker from any origin
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }

    // Step 1 — redirect to GitHub
    if (url.pathname === '/auth') {
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        scope: 'repo,user',
      });
      return Response.redirect(
        `https://github.com/login/oauth/authorize?${params}`,
        302
      );
    }

    // Step 2 — exchange code for token and hand back to Decap
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing code', { status: 400 });

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const data = await tokenRes.json();

      if (data.error || !data.access_token) {
        return postMessagePage('error', { error: data.error_description ?? data.error });
      }

      return postMessagePage('success', { token: data.access_token, provider: 'github' });
    }

    return new Response('Not found', { status: 404 });
  },
};

function postMessagePage(status, content) {
  const msg = `authorization:github:${status}:${JSON.stringify(content)}`;
  return new Response(
    `<!DOCTYPE html><html><head><title>Authenticating…</title></head><body><script>
      (function () {
        function receive(e) {
          window.opener.postMessage(${JSON.stringify(msg)}, e.origin);
          window.removeEventListener('message', receive);
          window.close();
        }
        window.addEventListener('message', receive, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script></body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
