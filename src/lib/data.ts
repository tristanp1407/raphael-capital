export type Sector =
  | "Retail"
  | "Office"
  | "Industrial"
  | "Mixed Use"
  | "Residential"
  | "Development";

export type PropertyStatus = "current" | "previous";

export type Property = {
  id: string;
  name: string;
  location: string;
  year: number;
  sector: Sector;
  summary: string;
  status: PropertyStatus;
  featured?: boolean;
};

export const allProperties: Property[] = [
  {
    id: "belgravia-house",
    name: "Belgravia House",
    location: "Belgravia, London",
    year: 2023,
    sector: "Residential",
    summary:
      "Prime lateral residences overlooking Eaton Square, delivered under budget with zero voids on launch.",
    status: "current",
    featured: true,
  },
  {
    id: "haymarket-arcade",
    name: "Haymarket Arcade",
    location: "Manchester City Centre",
    year: 2022,
    sector: "Retail",
    summary:
      "Adaptive reuse of a Grade II listed arcade into a curated retail destination with 18 anchor tenants.",
    status: "current",
    featured: true,
  },
  {
    id: "riverlight-quarter",
    name: "Riverlight Quarter",
    location: "Bristol Harbourside",
    year: 2021,
    sector: "Mixed Use",
    summary:
      "Waterside regeneration comprising workspace, amenity-led retail and 135 residential units.",
    status: "current",
    featured: true,
  },
  {
    id: "st-jamess-exchange",
    name: "St. James’s Exchange",
    location: "St James's, London",
    year: 2020,
    sector: "Office",
    summary:
      "Comprehensive repositioning of a 120,000 sq ft headquarters for blue-chip financial tenants.",
    status: "current",
  },
  {
    id: "the-foundry",
    name: "The Foundry",
    location: "Leeds Docklands",
    year: 2019,
    sector: "Industrial",
    summary:
      "Fully pre-let logistics hub optimised for urban last-mile distribution with BREEAM Excellent rating.",
    status: "current",
  },
  {
    id: "victoria-court",
    name: "Victoria Court",
    location: "Marylebone, London",
    year: 2018,
    sector: "Development",
    summary:
      "Ground-up development of boutique hospitality and residential units with private courtyard access.",
    status: "previous",
  },
  {
    id: "grand-crescent",
    name: "Grand Crescent",
    location: "Bath City Centre",
    year: 2017,
    sector: "Residential",
    summary:
      "Faithful restoration of Georgian townhouses into five luxury single-family residences.",
    status: "previous",
  },
  {
    id: "ludgate-pavilion",
    name: "Ludgate Pavilion",
    location: "Fleet Street, London",
    year: 2016,
    sector: "Office",
    summary:
      "A landmark workplace integrating flexible floorplates, wellness suites and private terraces.",
    status: "previous",
  },
  {
    id: "smithfield-collective",
    name: "Smithfield Collective",
    location: "Smithfield, Birmingham",
    year: 2015,
    sector: "Mixed Use",
    summary:
      "Curated market hall and co-working ecosystem anchoring city-centre regeneration strategy.",
    status: "previous",
  },
  {
    id: "harbour-point",
    name: "Harbour Point",
    location: "Liverpool Docks",
    year: 2014,
    sector: "Industrial",
    summary:
      "Port-side distribution warehouse reconfigured for multi-tenant occupancy with improved throughput.",
    status: "previous",
  },
  {
    id: "the-arc",
    name: "The Arc",
    location: "Newcastle Riverside",
    year: 2013,
    sector: "Development",
    summary:
      "Phased redevelopment of disused land into a mixed-use quarter with 40% public realm allocation.",
    status: "previous",
  },
  {
    id: "kingsway-gallery",
    name: "Kingsway Gallery",
    location: "Kingsway, London",
    year: 2012,
    sector: "Retail",
    summary:
      "Flagship retail terrace repositioned for luxury concession partners with a discreet street presence.",
    status: "previous",
  },
  {
    id: "regents-mews",
    name: "Regent’s Mews",
    location: "Regent's Park, London",
    year: 2011,
    sector: "Residential",
    summary:
      "Collection of mews houses sensitively extended to create contemporary family residences.",
    status: "previous",
  },
  {
    id: "northbank-works",
    name: "Northbank Works",
    location: "Glasgow Waterfront",
    year: 2010,
    sector: "Industrial",
    summary:
      "Strategic acquisition and enhancement of production facilities with long-term institutional tenancy.",
    status: "previous",
  },
];

export const featuredProperties = allProperties.filter((property) => property.featured);

const propertyImagePlaceholders = [
  {
    src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
    blurDataURL:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMCAxMCcgcHJlc2VydmVBc3BlY3RSYXRpbz0nbm9uZSc+PHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSclMjMwOTFmNWInLz48L3N2Zz4=",
    alt: "Architectural detail of a contemporary building facade",
  },
  {
    src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1600&q=80",
    blurDataURL:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMCAxMCcgcHJlc2VydmVBc3BlY3RSYXRpbz0nbm9uZSc+PHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSclMjMwOTFmNWInLz48L3N2Zz4=",
    alt: "Interior atrium with natural light and glass balustrades",
  },
  {
    src: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
    blurDataURL:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMCAxMCcgcHJlc2VydmVBc3BlY3RSYXRpbz0nbm9uZSc+PHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSclMjMwOTFmNWInLz48L3N2Zz4=",
    alt: "Modern development overlooking landscaped public realm",
  },
] as const;

export function getPropertyById(id: string) {
  return allProperties.find((property) => property.id === id);
}

const getPlaceholderByIndex = (index: number) =>
  propertyImagePlaceholders[
    ((index % propertyImagePlaceholders.length) + propertyImagePlaceholders.length) %
      propertyImagePlaceholders.length
  ];

export function getPropertyPlaceholderByIndex(index: number) {
  return getPlaceholderByIndex(index);
}

export function getPropertyPlaceholderById(id: string) {
  const index = allProperties.findIndex((property) => property.id === id);
  return getPlaceholderByIndex(index === -1 ? 0 : index);
}

export const propertySlugs = allProperties.map((property) => property.id);

export const brands = [
  "Wendy’s",
  "Boots",
  "Fortnum & Mason",
  "Selfridges",
  "Laureate Estates",
  "LVMH",
  "Pret A Manger",
  "Waitrose",
  "The Strand Group",
  "Liberty London",
] as const;

export const contacts = [
  {
    name: "Victor Levy",
    role: "Principal",
    email: "victor@raphaelcapital.co.uk",
  },
  {
    name: "Samuel Levy",
    role: "Director",
    email: "samuel@raphaelcapital.co.uk",
  },
] as const;

export const historyMilestones = [
  {
    year: 1999,
    title: "Founded in Mayfair",
    detail:
      "Raphael Capital launched with a mandate to steward private family capital into prime UK real estate.",
  },
  {
    year: 2008,
    title: "Counter-cyclical acquisitions",
    detail:
      "Navigated the financial crisis with disciplined acquisitions of core retail and office assets.",
  },
  {
    year: 2016,
    title: "National footprint",
    detail:
      "Expanded investment activity beyond London, partnering with institutional co-investors across the UK.",
  },
  {
    year: 2023,
    title: "Sustainable repositioning",
    detail:
      "Embedded ESG performance targets across the portfolio with BREEAM Excellent and NABERS ratings.",
  },
] as const;

export const assetRequirements = [
  "Mixed-use blocks with retail and residential components",
  "Retail units and uppers in strong trading locations",
  "Offices suited to repositioning or active asset management",
  "Industrial warehouses including urban logistics",
  "Shopping centres with value-add potential",
  "Retirement and care homes with resilient income profiles",
  "Development land with or without planning consent",
  "Vacant or redundant buildings for redevelopment",
  "Portfolios of income-producing or value-add assets",
  "Administration or receivership disposals requiring swift execution",
] as const;
