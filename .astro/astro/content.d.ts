declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"projects": {
"100-days-of-hope.mdx": {
	id: "100-days-of-hope.mdx";
  slug: "100-days-of-hope";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"a-dance-for-my-hosts.mdx": {
	id: "a-dance-for-my-hosts.mdx";
  slug: "a-dance-for-my-hosts";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"a-gift-to-my-daughter.mdx": {
	id: "a-gift-to-my-daughter.mdx";
  slug: "a-gift-to-my-daughter";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"a-million-miles-ago.mdx": {
	id: "a-million-miles-ago.mdx";
  slug: "a-million-miles-ago";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"a-recidivists-purgatory.mdx": {
	id: "a-recidivists-purgatory.mdx";
  slug: "a-recidivists-purgatory";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"a-timeline-of-segregation-over-the-years.mdx": {
	id: "a-timeline-of-segregation-over-the-years.mdx";
  slug: "a-timeline-of-segregation-over-the-years";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"administrative-segregation.mdx": {
	id: "administrative-segregation.mdx";
  slug: "administrative-segregation";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"all-books-no-people.mdx": {
	id: "all-books-no-people.mdx";
  slug: "all-books-no-people";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"altadamunself-location-of-a-palestinian-canadian-muslim-woman-refugee.mdx": {
	id: "altadamunself-location-of-a-palestinian-canadian-muslim-woman-refugee.mdx";
  slug: "altadamunself-location-of-a-palestinian-canadian-muslim-woman-refugee";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"an-inconvenient-monster.mdx": {
	id: "an-inconvenient-monster.mdx";
  slug: "an-inconvenient-monster";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"babylon-system-tough-cells.mdx": {
	id: "babylon-system-tough-cells.mdx";
  slug: "babylon-system-tough-cells";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"bear-claw-necklace.mdx": {
	id: "bear-claw-necklace.mdx";
  slug: "bear-claw-necklace";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"behind-the-walls-citizen-lawbreaker.mdx": {
	id: "behind-the-walls-citizen-lawbreaker.mdx";
  slug: "behind-the-walls-citizen-lawbreaker";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"blanketing-in-indigenous-cultures.mdx": {
	id: "blanketing-in-indigenous-cultures.mdx";
  slug: "blanketing-in-indigenous-cultures";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"blues-in-the-big-house.mdx": {
	id: "blues-in-the-big-house.mdx";
  slug: "blues-in-the-big-house";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"broken-promises.mdx": {
	id: "broken-promises.mdx";
  slug: "broken-promises";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"buried-in-solitude.mdx": {
	id: "buried-in-solitude.mdx";
  slug: "buried-in-solitude";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"canadian-inmates-connect.mdx": {
	id: "canadian-inmates-connect.mdx";
  slug: "canadian-inmates-connect";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"ceramic-bowl.mdx": {
	id: "ceramic-bowl.mdx";
  slug: "ceramic-bowl";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"citizen-lawbreaker.mdx": {
	id: "citizen-lawbreaker.mdx";
  slug: "citizen-lawbreaker";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"collage-and-the-history-of-treaty-negotiations-over-500-years.mdx": {
	id: "collage-and-the-history-of-treaty-negotiations-over-500-years.mdx";
  slug: "collage-and-the-history-of-treaty-negotiations-over-500-years";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"colonial-relations-in-point-grey-british-columbia.mdx": {
	id: "colonial-relations-in-point-grey-british-columbia.mdx";
  slug: "colonial-relations-in-point-grey-british-columbia";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"constructing-punishment.mdx": {
	id: "constructing-punishment.mdx";
  slug: "constructing-punishment";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"corrections-as-healing.mdx": {
	id: "corrections-as-healing.mdx";
  slug: "corrections-as-healing";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"creative-defiance-the-art-prison-tattoo.mdx": {
	id: "creative-defiance-the-art-prison-tattoo.mdx";
  slug: "creative-defiance-the-art-prison-tattoo";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"cree-medicine-bundle.mdx": {
	id: "cree-medicine-bundle.mdx";
  slug: "cree-medicine-bundle";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"documents-of-barbarism.mdx": {
	id: "documents-of-barbarism.mdx";
  slug: "documents-of-barbarism";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"dreaming-about-stawamus.mdx": {
	id: "dreaming-about-stawamus.mdx";
  slug: "dreaming-about-stawamus";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"endnotes-on-a-human-rights-atrocity.mdx": {
	id: "endnotes-on-a-human-rights-atrocity.mdx";
  slug: "endnotes-on-a-human-rights-atrocity";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"even-when-we-win-we-lose.mdx": {
	id: "even-when-we-win-we-lose.mdx";
  slug: "even-when-we-win-we-lose";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"four-sides-of-no-directions.mdx": {
	id: "four-sides-of-no-directions.mdx";
  slug: "four-sides-of-no-directions";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"freedom-flaunted.mdx": {
	id: "freedom-flaunted.mdx";
  slug: "freedom-flaunted";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"from-conception-to-rebirth.mdx": {
	id: "from-conception-to-rebirth.mdx";
  slug: "from-conception-to-rebirth";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"gus-wen-qah.mdx": {
	id: "gus-wen-qah.mdx";
  slug: "gus-wen-qah";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"gus-wen-tah.mdx": {
	id: "gus-wen-tah.mdx";
  slug: "gus-wen-tah";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"history-of-the-bc-penitentiary-wikipedia.mdx": {
	id: "history-of-the-bc-penitentiary-wikipedia.mdx";
  slug: "history-of-the-bc-penitentiary-wikipedia";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"i-am-a-treaty-canadian.mdx": {
	id: "i-am-a-treaty-canadian.mdx";
  slug: "i-am-a-treaty-canadian";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"innocence-and-imprisonment.mdx": {
	id: "innocence-and-imprisonment.mdx";
  slug: "innocence-and-imprisonment";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"insight-from-the-prison.mdx": {
	id: "insight-from-the-prison.mdx";
  slug: "insight-from-the-prison";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"into-time-out-of-mind.mdx": {
	id: "into-time-out-of-mind.mdx";
  slug: "into-time-out-of-mind";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"justice-in-jail.mdx": {
	id: "justice-in-jail.mdx";
  slug: "justice-in-jail";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"landscapes.mdx": {
	id: "landscapes.mdx";
  slug: "landscapes";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"lost-within-the-shadows.mdx": {
	id: "lost-within-the-shadows.mdx";
  slug: "lost-within-the-shadows";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"maskwa.mdx": {
	id: "maskwa.mdx";
  slug: "maskwa";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"messages-to-my-children.mdx": {
	id: "messages-to-my-children.mdx";
  slug: "messages-to-my-children";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"mikisew-cree-a-landscape-narrative.mdx": {
	id: "mikisew-cree-a-landscape-narrative.mdx";
  slug: "mikisew-cree-a-landscape-narrative";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"militant-gispewada.mdx": {
	id: "militant-gispewada.mdx";
  slug: "militant-gispewada";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"mother-and-child-a-lived-experience.mdx": {
	id: "mother-and-child-a-lived-experience.mdx";
  slug: "mother-and-child-a-lived-experience";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"mothers-and-children-in-prison.mdx": {
	id: "mothers-and-children-in-prison.mdx";
  slug: "mothers-and-children-in-prison";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"musqueam-history-and-oral-accounts.mdx": {
	id: "musqueam-history-and-oral-accounts.mdx";
  slug: "musqueam-history-and-oral-accounts";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"ndn-problem.mdx": {
	id: "ndn-problem.mdx";
  slug: "ndn-problem";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"nice-to-meet-you.mdx": {
	id: "nice-to-meet-you.mdx";
  slug: "nice-to-meet-you";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"nisgaa-self-government-an-ongoing-journey.mdx": {
	id: "nisgaa-self-government-an-ongoing-journey.mdx";
  slug: "nisgaa-self-government-an-ongoing-journey";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"no-middle-ground.mdx": {
	id: "no-middle-ground.mdx";
  slug: "no-middle-ground";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"notes-from-the-prison-underground.mdx": {
	id: "notes-from-the-prison-underground.mdx";
  slug: "notes-from-the-prison-underground";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"oceans-and-origins.mdx": {
	id: "oceans-and-origins.mdx";
  slug: "oceans-and-origins";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"oka-crisis.mdx": {
	id: "oka-crisis.mdx";
  slug: "oka-crisis";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"on-cause-effect-and-suffering.mdx": {
	id: "on-cause-effect-and-suffering.mdx";
  slug: "on-cause-effect-and-suffering";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"on-wings-of-change-the-nisgaa-final-agreement.mdx": {
	id: "on-wings-of-change-the-nisgaa-final-agreement.mdx";
  slug: "on-wings-of-change-the-nisgaa-final-agreement";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"oral-traditions-of-the-tlicho.mdx": {
	id: "oral-traditions-of-the-tlicho.mdx";
  slug: "oral-traditions-of-the-tlicho";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"outlook.mdx": {
	id: "outlook.mdx";
  slug: "outlook";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"papaschase-indian-reserve-a-reimagened-history.mdx": {
	id: "papaschase-indian-reserve-a-reimagened-history.mdx";
  slug: "papaschase-indian-reserve-a-reimagened-history";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"pathways-ensnared.mdx": {
	id: "pathways-ensnared.mdx";
  slug: "pathways-ensnared";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"peace-pipe-project.mdx": {
	id: "peace-pipe-project.mdx";
  slug: "peace-pipe-project";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"racial-dimensions-of-incarceration-in-canada.mdx": {
	id: "racial-dimensions-of-incarceration-in-canada.mdx";
  slug: "racial-dimensions-of-incarceration-in-canada";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"ravenous-equality-and-reconcilable-differences.mdx": {
	id: "ravenous-equality-and-reconcilable-differences.mdx";
  slug: "ravenous-equality-and-reconcilable-differences";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"ravens-journey-to-the-four-corners.mdx": {
	id: "ravens-journey-to-the-four-corners.mdx";
  slug: "ravens-journey-to-the-four-corners";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"reconciliation-blanket-for-modern-treatymaking-in-british-columbia.mdx": {
	id: "reconciliation-blanket-for-modern-treatymaking-in-british-columbia.mdx";
  slug: "reconciliation-blanket-for-modern-treatymaking-in-british-columbia";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"reconnection-to-culture.mdx": {
	id: "reconnection-to-culture.mdx";
  slug: "reconnection-to-culture";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"reflect-the-realities.mdx": {
	id: "reflect-the-realities.mdx";
  slug: "reflect-the-realities";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"reset.mdx": {
	id: "reset.mdx";
  slug: "reset";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"restorative-justice-behind-bars.mdx": {
	id: "restorative-justice-behind-bars.mdx";
  slug: "restorative-justice-behind-bars";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"restoule.mdx": {
	id: "restoule.mdx";
  slug: "restoule";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"resurgence.mdx": {
	id: "resurgence.mdx";
  slug: "resurgence";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"robes-of-power.mdx": {
	id: "robes-of-power.mdx";
  slug: "robes-of-power";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"robinson-huron-treaty.mdx": {
	id: "robinson-huron-treaty.mdx";
  slug: "robinson-huron-treaty";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"script.mdx": {
	id: "script.mdx";
  slug: "script";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"serpents-steam-trains-and-aboriginal-title.mdx": {
	id: "serpents-steam-trains-and-aboriginal-title.mdx";
  slug: "serpents-steam-trains-and-aboriginal-title";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"silhouette-lamp.mdx": {
	id: "silhouette-lamp.mdx";
  slug: "silhouette-lamp";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"site-c-and-the-west-moberly-first-nations-treaty-8-rights.mdx": {
	id: "site-c-and-the-west-moberly-first-nations-treaty-8-rights.mdx";
  slug: "site-c-and-the-west-moberly-first-nations-treaty-8-rights";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"sliammon-first-nations-treaty-1764-1850-and-2005.mdx": {
	id: "sliammon-first-nations-treaty-1764-1850-and-2005.mdx";
  slug: "sliammon-first-nations-treaty-1764-1850-and-2005";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"sliamon-lands.mdx": {
	id: "sliamon-lands.mdx";
  slug: "sliamon-lands";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"solitary-confinement.mdx": {
	id: "solitary-confinement.mdx";
  slug: "solitary-confinement";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"stereotypes-violence-and-ashley-smith.mdx": {
	id: "stereotypes-violence-and-ashley-smith.mdx";
  slug: "stereotypes-violence-and-ashley-smith";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"stories-of-conservation-and-aboriginal-treaty-rights.mdx": {
	id: "stories-of-conservation-and-aboriginal-treaty-rights.mdx";
  slug: "stories-of-conservation-and-aboriginal-treaty-rights";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"story-telling.mdx": {
	id: "story-telling.mdx";
  slug: "story-telling";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"strarlight-tours.mdx": {
	id: "strarlight-tours.mdx";
  slug: "strarlight-tours";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"talking-past-each-other.mdx": {
	id: "talking-past-each-other.mdx";
  slug: "talking-past-each-other";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-algonquins-of-pikwakanagan.mdx": {
	id: "the-algonquins-of-pikwakanagan.mdx";
  slug: "the-algonquins-of-pikwakanagan";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-broken-kite.mdx": {
	id: "the-broken-kite.mdx";
  slug: "the-broken-kite";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-copper-and-the-gavel.mdx": {
	id: "the-copper-and-the-gavel.mdx";
  slug: "the-copper-and-the-gavel";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-cultural-and-legal-importance-of-the-wumpum-belt.mdx": {
	id: "the-cultural-and-legal-importance-of-the-wumpum-belt.mdx";
  slug: "the-cultural-and-legal-importance-of-the-wumpum-belt";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-damage-done.mdx": {
	id: "the-damage-done.mdx";
  slug: "the-damage-done";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-extent-of-a-compromise.mdx": {
	id: "the-extent-of-a-compromise.mdx";
  slug: "the-extent-of-a-compromise";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-first-legal-debate-on-the-rights-of-indigenous-peoples.mdx": {
	id: "the-first-legal-debate-on-the-rights-of-indigenous-peoples.mdx";
  slug: "the-first-legal-debate-on-the-rights-of-indigenous-peoples";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-great-escape-reattempted.mdx": {
	id: "the-great-escape-reattempted.mdx";
  slug: "the-great-escape-reattempted";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-history-of-treaty-making.mdx": {
	id: "the-history-of-treaty-making.mdx";
  slug: "the-history-of-treaty-making";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-illusion-of-treaty-eight.mdx": {
	id: "the-illusion-of-treaty-eight.mdx";
  slug: "the-illusion-of-treaty-eight";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-intersection-of-indigenous-and-common-law-conceptions-of-land.mdx": {
	id: "the-intersection-of-indigenous-and-common-law-conceptions-of-land.mdx";
  slug: "the-intersection-of-indigenous-and-common-law-conceptions-of-land";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-language-of-prison-tattoos.mdx": {
	id: "the-language-of-prison-tattoos.mdx";
  slug: "the-language-of-prison-tattoos";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-last-kills.mdx": {
	id: "the-last-kills.mdx";
  slug: "the-last-kills";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-numbered-treaties.mdx": {
	id: "the-numbered-treaties.mdx";
  slug: "the-numbered-treaties";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-prison-state.mdx": {
	id: "the-prison-state.mdx";
  slug: "the-prison-state";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-prisoner-as-artist.mdx": {
	id: "the-prisoner-as-artist.mdx";
  slug: "the-prisoner-as-artist";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-prisoners-struggle.mdx": {
	id: "the-prisoners-struggle.mdx";
  slug: "the-prisoners-struggle";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-spiritual-significance-of-treaty-4.mdx": {
	id: "the-spiritual-significance-of-treaty-4.mdx";
  slug: "the-spiritual-significance-of-treaty-4";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-tunnel.mdx": {
	id: "the-tunnel.mdx";
  slug: "the-tunnel";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-unsettling-of-turtle-island-a-visual-essay.mdx": {
	id: "the-unsettling-of-turtle-island-a-visual-essay.mdx";
  slug: "the-unsettling-of-turtle-island-a-visual-essay";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"the-worst-punishment.mdx": {
	id: "the-worst-punishment.mdx";
  slug: "the-worst-punishment";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"there-is-a-way-to-live-with-the-earth-and-not-to-live-with-the-earth.mdx": {
	id: "there-is-a-way-to-live-with-the-earth-and-not-to-live-with-the-earth.mdx";
  slug: "there-is-a-way-to-live-with-the-earth-and-not-to-live-with-the-earth";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"thirty-years-forward.mdx": {
	id: "thirty-years-forward.mdx";
  slug: "thirty-years-forward";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"thleewee.mdx": {
	id: "thleewee.mdx";
  slug: "thleewee";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"three-days-in-the-thunder-hills.mdx": {
	id: "three-days-in-the-thunder-hills.mdx";
  slug: "three-days-in-the-thunder-hills";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"time-in-seg.mdx": {
	id: "time-in-seg.mdx";
  slug: "time-in-seg";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"to-those-among-us.mdx": {
	id: "to-those-among-us.mdx";
  slug: "to-those-among-us";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"traditional-metis-capote.mdx": {
	id: "traditional-metis-capote.mdx";
  slug: "traditional-metis-capote";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"trail-of-tears.mdx": {
	id: "trail-of-tears.mdx";
  slug: "trail-of-tears";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"treaty-eight-18909-annotated.mdx": {
	id: "treaty-eight-18909-annotated.mdx";
  slug: "treaty-eight-18909-annotated";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"treaty-identity-moving-beyond-legal-definitions.mdx": {
	id: "treaty-identity-moving-beyond-legal-definitions.mdx";
  slug: "treaty-identity-moving-beyond-legal-definitions";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"treaty-of-lancaster-june-1744.mdx": {
	id: "treaty-of-lancaster-june-1744.mdx";
  slug: "treaty-of-lancaster-june-1744";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"treaty-six-revisited.mdx": {
	id: "treaty-six-revisited.mdx";
  slug: "treaty-six-revisited";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"truth-and-reconciliation-blanket.mdx": {
	id: "truth-and-reconciliation-blanket.mdx";
  slug: "truth-and-reconciliation-blanket";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"understanding-imprisonment-2.mdx": {
	id: "understanding-imprisonment-2.mdx";
  slug: "understanding-imprisonment-2";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"upper-athabasca-metis-medicine-pouch.mdx": {
	id: "upper-athabasca-metis-medicine-pouch.mdx";
  slug: "upper-athabasca-metis-medicine-pouch";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"we-the-people-of-the-dene.mdx": {
	id: "we-the-people-of-the-dene.mdx";
  slug: "we-the-people-of-the-dene";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"where-am-i-acknowledging-indigenous-place-in-the-prairies.mdx": {
	id: "where-am-i-acknowledging-indigenous-place-in-the-prairies.mdx";
  slug: "where-am-i-acknowledging-indigenous-place-in-the-prairies";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"where-we-come-from-is-wealth.mdx": {
	id: "where-we-come-from-is-wealth.mdx";
  slug: "where-we-come-from-is-wealth";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"words-from-behind-the-walls.mdx": {
	id: "words-from-behind-the-walls.mdx";
  slug: "words-from-behind-the-walls";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
"yo-hah.mdx": {
	id: "yo-hah.mdx";
  slug: "yo-hah";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
