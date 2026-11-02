// Single source of content for the site. Mirrors the Framer CMS collections
// (Spaces, Projects) so the coded site and the Framer site stay in sync.

const U = (id: string, w = 2000) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const IMG = {
  hero: U("1600210492486-724fe5c67fb0"),
  home: U("1600607687939-ce8a6c25118c"),
  cafe: U("1554118811-1e0d58224f24"),
  resto: U("1517248135467-4c7edcad34c4"),
  office: U("1497366216548-37526070297c"),
  mid: U("1586023492125-27b2c045efd7"),
  cont: U("1616486338812-3dadae4b4ace"),
  zen: U("1618221195710-dd6b41faaea6"),
  cta: U("1414235077428-338989a2e8c0"),
};

export type Space = {
  slug: string;
  number: string;
  name: string;
  jp: string;
  description: string;
  cover: string;
};

export const spaces: Space[] = [
  { slug: "home-living", number: "01", name: "Home Living", jp: "住まい", description: "Comfort for every morning routine — homes that slow the day down.", cover: IMG.home },
  { slug: "cafe-and-coffeeshop", number: "02", name: "Café & Coffeeshop", jp: "喫茶", description: "Made for gathering and comfort, where regulars feel at home.", cover: IMG.cafe },
  { slug: "restaurant", number: "03", name: "Restaurant", jp: "食処", description: "Warm spaces for meaningful dining, lit for long conversations.", cover: IMG.resto },
  { slug: "office", number: "04", name: "Office", jp: "仕事場", description: "Calm, focused workspaces that support productivity and wellbeing.", cover: IMG.office },
];

export type Project = {
  slug: string;
  number: string;
  name: string;
  space: string; // space slug
  style: string;
  location: string;
  year: string;
  area: string;
  duration: string;
  cover: string;
  summary: string;
  story: string[];
};

export const projects: Project[] = [
  { slug: "residence-hartono", number: "052", name: "Residence Hartono", space: "home-living", style: "Japanese Mid-Century", location: "Semarang", year: "2026", area: "240 m²", duration: "7 months", cover: IMG.hero, summary: "A family home rebuilt around one long walnut sideboard, paper light and a living room that faces the garden.", story: ["The Hartono family wanted a house that felt slower than their week. We opened the ground floor into one long room and let a walnut sideboard run its full length, so storage became the quiet backbone of the space.", "Paper lanterns, linen upholstery and lime-washed walls keep the light soft from morning to evening. Nothing is loud, and everything has a place."] },
  { slug: "kissa-lantern-coffee", number: "050", name: "Kissa Lantern Coffee", space: "cafe-and-coffeeshop", style: "Contemporary Japanese", location: "Yogyakarta", year: "2026", area: "120 m²", duration: "4 months", cover: IMG.cafe, summary: "A neighbourhood kissaten with a pale oak bar, low counters and a reading corner that fills up by nine.", story: ["Kissa Lantern started as a small takeaway counter. The new space turns it into a place to stay, with a pale oak bar at standing height and a row of low seats along the window.", "We kept the palette to oak, plaster and one shade of clay so the coffee and the people bring the colour."] },
  { slug: "omakase-rin", number: "048", name: "Omakase Rin", space: "restaurant", style: "Zen Minimalist", location: "Jakarta", year: "2025", area: "95 m²", duration: "5 months", cover: IMG.resto, summary: "Twelve seats around a hinoki counter, lit only where the food is served.", story: ["At Omakase Rin, the chef is the performance. We designed a single hinoki counter for twelve guests and dropped the light low so every plate becomes the brightest thing in the room.", "The walls are finished in raw clay plaster that absorbs sound, keeping conversations close and calm."] },
  { slug: "pratama-and-co-studio", number: "047", name: "Pratama & Co. Studio", space: "office", style: "Contemporary Japanese", location: "Surabaya", year: "2025", area: "410 m²", duration: "6 months", cover: IMG.office, summary: "An architecture practice with paper-screen meeting rooms and a shared table for forty.", story: ["Pratama & Co. asked for an office that supports deep work without feeling closed off. Sliding paper screens let meeting rooms open or close through the day.", "A forty-seat shared table in solid oak sits at the centre, so the team gathers around work rather than around screens."] },
  { slug: "villa-setiawan", number: "045", name: "Villa Setiawan", space: "home-living", style: "Zen Minimalist", location: "Ubud, Bali", year: "2025", area: "320 m²", duration: "9 months", cover: IMG.zen, summary: "A holiday villa where tatami rooms open straight onto the rice terraces.", story: ["Villa Setiawan is built for rest. Each bedroom opens onto a covered veranda and the rice terraces beyond, with tatami floors and low futon beds.", "We used local stone and hinoki together, so the house feels both Balinese and Japanese without trying to be either."] },
  { slug: "hinoki-bakehouse", number: "043", name: "Hinoki Bakehouse", space: "cafe-and-coffeeshop", style: "Japanese Mid-Century", location: "Semarang", year: "2025", area: "85 m²", duration: "3 months", cover: IMG.mid, summary: "A bakery café with warm timber shelving, brass details and the smell of shokupan at seven.", story: ["Hinoki Bakehouse needed a space that sells bread from the moment you walk in. Open timber shelving puts every loaf on display, framed by brass rails and warm pendant light.", "Seating is limited on purpose: eight stools at a window counter for those who cannot wait until home."] },
  { slug: "kaze-izakaya", number: "041", name: "Kaze Izakaya", space: "restaurant", style: "Japanese Mid-Century", location: "Bandung", year: "2024", area: "160 m²", duration: "5 months", cover: IMG.resto, summary: "A lively izakaya with walnut booths, noren curtains and a long charcoal grill.", story: ["Kaze is loud in the best way. We gave the room walnut booths with high backs, so each table feels private even when the grill is at full heat.", "Noren curtains divide the space softly, and a long charcoal grill anchors the room."] },
  { slug: "tan-family-apartment", number: "039", name: "Tan Family Apartment", space: "home-living", style: "Contemporary Japanese", location: "Jakarta", year: "2024", area: "145 m²", duration: "4 months", cover: IMG.cont, summary: "A city apartment made calm with pale oak, plaster and filtered daylight.", story: ["The Tan family live thirty floors above a busy street. We softened the apartment with pale oak, lime plaster and full-height paper screens that filter the afternoon sun.", "Storage is built into every wall, so the rooms stay open and quiet."] },
  { slug: "studio-ruang-atelier", number: "036", name: "Studio Ruang Atelier", space: "office", style: "Zen Minimalist", location: "Malang", year: "2024", area: "180 m²", duration: "4 months", cover: IMG.office, summary: "A ceramic studio and showroom with raw clay walls and long work benches.", story: ["Studio Ruang makes ceramics by hand, and the space needed to show that. Raw clay walls and long timber benches give the makers room to work and visitors room to watch.", "The showroom sits behind a paper screen, lit like a gallery."] },
  { slug: "matcha-house-sora", number: "034", name: "Matcha House Sora", space: "cafe-and-coffeeshop", style: "Zen Minimalist", location: "Solo", year: "2024", area: "70 m²", duration: "3 months", cover: IMG.zen, summary: "A tea house with a single stone counter and a small garden view.", story: ["Matcha House Sora is about one drink, made slowly. A single stone counter faces a small garden, and the menu board is the only graphic in the room.", "Guests often stay longer than planned, which was exactly the idea."] },
];

export const styles = [
  { index: "i.", name: "Japanese Mid-Century", short: "Mid-Century", description: "Warm walnut, low silhouettes and paper light. Postwar Japanese craft meets the ease of mid-century living.", materials: ["Walnut", "Washi paper", "Linen", "Brass"], count: 12, image: IMG.mid },
  { index: "ii.", name: "Contemporary Japanese", short: "Contemporary", description: "Clean architectural lines softened by pale oak, lime plaster and filtered daylight. Bright, calm and quietly modern.", materials: ["Pale oak", "Lime plaster", "Paper screens", "Stone"], count: 24, image: IMG.cont },
  { index: "iii.", name: "Zen Minimalist", short: "Zen", description: "Almost nothing, and everything in its place. Bare textures, low furniture and room for the mind to rest.", materials: ["Hinoki", "Tatami", "Raw clay", "Basalt"], count: 16, image: IMG.zen },
];

export const testimonials = [
  { quote: "The moment we stepped inside, the house felt calm and welcoming. It’s elegant, functional, and deeply personal.", name: "Jane Hartono", project: "Residence Hartono, Semarang", avatar: U("1544005313-94ddf0286df2", 200) },
  { quote: "Our office now feels open, focused and inspiring. Shizu understood how to make a workspace that supports both productivity and wellbeing.", name: "Daniel Pratama", project: "Pratama & Co. Studio, Surabaya", avatar: U("1507003211169-0a1dd7228f2d", 200) },
  { quote: "What impressed us most was the attention to detail. Every corner feels intentional, and it will stay relevant for years.", name: "Jessica Tan", project: "Tan Family Apartment, Jakarta", avatar: U("1438761681033-6461ffad8d80", 200) },
];

export const spaceBySlug = (slug: string) => spaces.find((s) => s.slug === slug);
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const projectsInSpace = (slug: string) => projects.filter((p) => p.space === slug);
