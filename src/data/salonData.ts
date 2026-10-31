import { SalonLocation, ServiceCategory, ServiceItem, AddOnBooster, Artisan, MembershipTier, ClientReview, Booking } from '../types';

export const SALON_LOCATIONS: SalonLocation[] = [
  {
    id: 'bandra-pali-hill',
    name: 'Pali Hill Flagship Atelier',
    tagline: 'Haute-Coiffure & Private Sanctuary Suites',
    neighborhood: 'Bandra West, Mumbai',
    address: '14 Union Park, Pali Hill, Bandra West, Mumbai, Maharashtra 400050',
    phone: '+91 (022) 6940 8800',
    valetAvailable: true,
    privateSuitesCount: 4,
    timings: '09:00 AM – 09:30 PM (Daily)',
    landmark: 'Opposite Zig Zag Road, amidst lush heritage canopy',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    features: ['Private VIP Bridal Vault', 'Botanical Hair Apothecary', 'Valet Chauffeur Lounge', 'Artisanal Herbal Tea Bar']
  },
  {
    id: 'colaba-heritage',
    name: 'Colaba Heritage Mansions',
    tagline: 'Art Deco Splendor & Classical Ayurvedic Spas',
    neighborhood: 'Colaba, South Mumbai',
    address: 'Flat 2, Cecil Mansions, Arthur Bunder Rd, Colaba, Mumbai, Maharashtra 400005',
    phone: '+91 (022) 6940 8820',
    valetAvailable: true,
    privateSuitesCount: 3,
    timings: '09:30 AM – 09:00 PM (Daily)',
    landmark: '2 minutes stroll from The Taj Mahal Palace & Gateway of India',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    features: ['Shirodhara Cedar Chambers', 'Private Heritage Verandah', 'Custom Essential Oil Distillation', 'Sound Bath Pavilion']
  },
  {
    id: 'juhu-coastal',
    name: 'Juhu Gulmohar Sanctuary',
    tagline: 'Coastal Tranquility & Cellular Rejuvenation',
    neighborhood: 'Juhu Scheme, Mumbai',
    address: 'Gulmohar Cross Road No. 7, JVPD Scheme, Juhu, Mumbai, Maharashtra 400049',
    phone: '+91 (022) 6940 8840',
    valetAvailable: true,
    privateSuitesCount: 3,
    timings: '10:00 AM – 09:30 PM (Daily)',
    landmark: 'Quiet tree-lined enclave near Juhu Beach ocean breeze',
    imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
    features: ['Open-air Courtyard Garden', 'Cellular Cryo Facial Suites', 'Organic Scalp Bar', 'Valet Parking Available']
  }
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'all', label: 'All Rituals', description: 'Explore the full spectrum of our handcrafted hair, skin, and sensory ceremonies.' },
  { id: 'hair', label: 'Hair Couture & Scalp', description: 'Haute-coiffure cutting, cellular botanical gloss, and trichology scalp therapies.' },
  { id: 'skin', label: 'Ayurvedic & Cellular Skin', description: 'High-potency botanicals, Kumkumadi elixirs, and bespoke sculptural facials.' },
  { id: 'spa', label: 'Therapeutic Head Spas', description: 'Sensory Hammam wash rituals, Tibetan bowl resonance, and warm oil Shirodhara.' },
  { id: 'bridal', label: 'Bridal & Royal Celebrations', description: 'Curated royal trousseau packages, private suite styling, and wedding couture glow.' },
  { id: 'nails', label: 'Nail Atelier & Hands', description: 'Sandalwood hydration, 24K gold foil accents, and immaculate manicure ceremonies.' }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'kintsugi-hair-restoration',
    title: 'Kintsugi Botanical Hair Restoration',
    category: 'hair',
    subtitle: 'Ceramic Micro-Keratin & Cold-Pressed Camellia Oil',
    durationMinutes: 90,
    priceINR: 8500,
    tag: 'Signature Ritual',
    isPopular: true,
    description: 'Inspired by the Japanese philosophy of mending with gold, this deep restorative ritual repairs fractured hair fibers using micronized bio-keratin, Himalayan cedarwood, and organic cold-pressed Camellia japonica seed oil.',
    ritualSteps: [
      { stepNumber: 1, name: 'Micro-Scalp & Fiber Diagnosis', description: 'High-magnification dermascope analysis of scalp micro-flora and cuticle porosity.' },
      { stepNumber: 2, name: 'Thermal Botanical Infusion', description: 'Warm herbal steam infused with Kashmiri rosemary and cold-pressed camellia extract.' },
      { stepNumber: 3, name: 'Kintsugi Keratin Bond Seal', description: 'Ultrasonic cold plate technology that locks micro-proteins deep within the hair cortex.' },
      { stepNumber: 4, name: 'Silk Tension Blowout & Gloss', description: 'Hand-sculpted finish leaving weightless movement, silk mirror shine, and thermal protection.' }
    ],
    botanicalIngredients: ['Organic Cold-Pressed Camellia Oil', 'Wild Himalayan Cedarwood', 'Hydrolyzed Wheat Peptides', 'Kashmiri Rosemary'],
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80',
    bestFor: 'Dry, colored, chemically treated, or heat-fatigued tresses seeking lasting rejuvenation.'
  },
  {
    id: 'royal-kesar-cellular-glow',
    title: 'Royal Kesar & Kumkumadi Cellular Glow',
    category: 'skin',
    subtitle: 'Grade-A Kashmiri Saffron & 24K Gold Dust Elixir',
    durationMinutes: 75,
    priceINR: 9200,
    tag: 'Ayurvedic Fusion',
    isPopular: true,
    description: 'An ancient Vedic beauty ceremony formulated for modern Mumbai nobility. Pure Pampore Kashmiri saffron threads, red sandalwood, and 26 sacred herbs gently dissolve dullness and stimulate lymphatic vitality.',
    ritualSteps: [
      { stepNumber: 1, name: 'Raw Honey & Vetiver Cleansing', description: 'Gentle enzymatic cleanse using wild forest honey and fragrant Vetiver hydro-distillate.' },
      { stepNumber: 2, name: 'Kesar & Almond Polishing Grain', description: 'Gentle micro-exfoliation with hand-crushed Mamra almonds and saffron stamens.' },
      { stepNumber: 3, name: 'Warm Rose Quartz Facial Massage', description: 'Deep sculpting lymphatic stimulation targeting marma facial points.' },
      { stepNumber: 4, name: '24K Aurum Gold Leaf Masque', description: 'Application of edible 24K gold foil followed by a warm sandalwood thermal pack.' }
    ],
    botanicalIngredients: ['Pampore Kashmiri Saffron (Crocus Sativus)', 'Raktachandana (Red Sandalwood)', 'Lotus Stamen Essence', 'Wild Vetiver Root'],
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    bestFor: 'Dullness, hyperpigmentation, festive occasions, and patrons desiring an ethereal golden radiance.'
  },
  {
    id: 'moroccan-rosewood-head-spa',
    title: 'Moroccan Rosewood Hammam Scalp Therapy',
    category: 'spa',
    subtitle: 'Warm Eucalyptus Steam, Rosewood & Scalp Waterfall',
    durationMinutes: 90,
    priceINR: 9800,
    tag: 'Sensory Odyssey',
    isPopular: true,
    description: 'A decadent head spa ceremony conducted in our bespoke ergonomic water basins. Combines deep scalp detox, warm herbal cascade hydrotherapy, and acupressure neck-shoulder tension release.',
    ritualSteps: [
      { stepNumber: 1, name: 'Purifying Rhassoul Clay Poultice', description: 'Atlas mountain clay combined with damask rosewater to draw out sebum and pollution.' },
      { stepNumber: 2, name: 'Continuous Warm Herbal Waterfall', description: 'A soothing thermal crown halo rain infused with calming lavender and cedar.' },
      { stepNumber: 3, name: 'Acupressure Marma Crown Massage', description: '12-point rhythmic stimulation releasing craniosacral tension.' },
      { stepNumber: 4, name: 'Organic Argan Scalp Elixir Seal', description: 'Cold-pressed virgin argan drops massaged to strengthen root follicles.' }
    ],
    botanicalIngredients: ['Damask Rose Water', 'Moroccan Atlas Rhassoul Clay', 'Cold-Pressed Argan Oil', 'French Lavender Distillate'],
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
    bestFor: 'Mental stress relief, scalp detox, headache tension, and deep relaxation.'
  },
  {
    id: 'haute-couture-sculpt-gloss',
    title: 'Haute Couture Sculpt & Gloss Ceremony',
    category: 'hair',
    subtitle: 'Bespoke Dry-Cut Architecture & Translucent French Glaze',
    durationMinutes: 75,
    priceINR: 6800,
    tag: 'Paris-Mumbai Atelier',
    isPopular: false,
    description: 'Our signature bespoke haircut tailoring. We analyze facial bone geometry, natural hair growth spirals, and lifestyle movement before executing an unhurried, razor-soft dry architectural cut.',
    ritualSteps: [
      { stepNumber: 1, name: 'Morpho-Aesthetic Consultation', description: 'Detailed analysis of jawline curvature, collarbone framing, and hair fall patterns.' },
      { stepNumber: 2, name: 'Aromatic Scalp Purify & Wash', description: 'Botanical shampoo with jasmine sambac and gentle scalp friction.' },
      { stepNumber: 3, name: 'Precision Sculpting Cut', description: 'Handcrafted dry texturizing tailored to maintain weight while liberating movement.' },
      { stepNumber: 4, name: 'Acidic High-Shine Glaze & Style', description: 'Zero-ammonia translucent gloss providing 6-week glass-like shine.' }
    ],
    botanicalIngredients: ['Hydrolyzed Quinoa Protein', 'Sunflower Seed Shield', 'Jasmine Sambac Extract', 'Vegetable Ceramides'],
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    bestFor: 'Patrons seeking a signature, effortless silhouette that falls naturally into place without daily effort.'
  },
  {
    id: 'sacred-shirodhara-hair-spa',
    title: 'Sacred Shirodhara & Botanical Hair Spa',
    category: 'spa',
    subtitle: 'Continuous Medicated Herbal Oil Cascade & Head Rejuvenation',
    durationMinutes: 75,
    priceINR: 8200,
    tag: 'Ayurvedic Fusion',
    isPopular: false,
    description: 'An ancient therapy where a steady stream of lukewarm herbalized sesame and brahmi oil pours gently onto the third eye (Ajna Chakra), dissolving sensory fatigue and nourishing hair follicles from the root.',
    ritualSteps: [
      { stepNumber: 1, name: 'Shiroabhyanga Head Massage', description: 'Warm herbal oil applied with rhythmic palm strokes across shoulders and scalp.' },
      { stepNumber: 2, name: 'The Shirodhara Stream', description: '30-minute uninterrupted meditative stream of warm Brahmi and Bhringraj infusion.' },
      { stepNumber: 3, name: 'Kashmiri Saffron Scalp Mask', description: 'Nutritive botanical paste applied to cool and seal follicles.' },
      { stepNumber: 4, name: 'Herbal Infusion Rinse & Blowdry', description: 'Warm water wash with gentle shikakai extract and rough blow-dry.' }
    ],
    botanicalIngredients: ['Organic Brahmi Oil', 'Bhringraj Extract', 'Cold-Pressed Black Sesame Seed Oil', 'Sandalwood Absolute'],
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80',
    bestFor: 'Insomnia, mental fatigue, hair thinning, anxiety relief, and deep grounding.'
  },
  {
    id: 'marine-peptide-cryo-facial',
    title: 'Marine Peptide & Cryo Sculpt Facial',
    category: 'skin',
    subtitle: 'Sub-Zero Oxygen Mist & Bio-Marine Collagen Architecture',
    durationMinutes: 60,
    priceINR: 7800,
    tag: 'Cellular Lift',
    isPopular: false,
    description: 'A revolutionary facial pairing deep sea blue algae peptides with controlled sub-zero cryo-wand passes to instantly tighten lax skin, reduce puffiness, and chisel cheekbone contours.',
    ritualSteps: [
      { stepNumber: 1, name: 'Deep Enzyme Pore Cleansing', description: 'Papaya and pineapple enzymes dissolve oxidized impurities.' },
      { stepNumber: 2, name: 'Marine Collagen Serum Infusion', description: 'Ultrasonic micro-current driven transdermal peptide delivery.' },
      { stepNumber: 3, name: 'Sub-Zero Cryo-Sculpting Passes', description: '-4°C localized cold wands promoting micro-circulation and immediate firming.' },
      { stepNumber: 4, name: 'Alginate Seaweed Cooling Mask', description: 'Peel-off oceanic mineral mask locking active moisture for 72 hours.' }
    ],
    botanicalIngredients: ['Spirulina Platensis Algae', 'Antarctic Marine Glycoproteins', 'Hyaluronic Acid Multi-Weight', 'Chlorella Extract'],
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    bestFor: 'Instant contouring before high-profile galas, reducing redness, and tired complexions.'
  },
  {
    id: 'maharani-couture-bridal',
    title: 'The Maharani Couture Bridal Experience',
    category: 'bridal',
    subtitle: 'Four-Hour Private Suite Ritual: Skin, Hair, Hands & Glow',
    durationMinutes: 240,
    priceINR: 32000,
    tag: 'Private Suite Exclusive',
    isPopular: true,
    description: 'An all-encompassing sanctuary ritual reserved inside our Private VIP Suite. Includes full bridal hair styling, bespoke skin illumination with 24K gold leaf, luxury hand and foot ceremony, and celebratory champagne & artisan macarons.',
    ritualSteps: [
      { stepNumber: 1, name: 'Champagne Reception & Consultation', description: 'Private suite welcome with bespoke Ayurvedic consultation and refreshment.' },
      { stepNumber: 2, name: 'Full Royal Kesar Skin Illumination', description: 'Complete 75-minute face, décolletage, and back radiant polish.' },
      { stepNumber: 3, name: 'Couture Hair Architecture & Veil Setting', description: 'Intricate bridal styling, flower placement or veil security.' },
      { stepNumber: 4, name: 'Imperial 24K Gold Hand & Foot Ceremony', description: 'Saffron soak, gold leaf polish, and flawless gel/lacquer finish.' }
    ],
    botanicalIngredients: ['24K Edible Gold Foil', 'Pure Pampore Saffron', 'Mysore White Sandalwood', 'Kashmiri Rose Extract'],
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    bestFor: 'Brides, festive celebrants, and patrons seeking Mumbai’s finest ultra-luxury salon experience.'
  },
  {
    id: 'gold-flake-rose-pedicure',
    title: '24K Gold Flake & Rose Petal Pedicure',
    category: 'nails',
    subtitle: 'Handmade Copper Basin Soak, Saffron Scrub & Paraffin Hydration',
    durationMinutes: 75,
    priceINR: 4600,
    tag: 'Luxury Pedicure',
    isPopular: false,
    description: 'Feet are submerged in warm, beaten copper vessels brimming with fresh rose petals, coconut milk, and Himalayan pink salt. Finished with gold shimmer oil, precision cuticle grooming, and artisan lacquer.',
    ritualSteps: [
      { stepNumber: 1, name: 'Floral Milk & Copper Bath', description: 'Soothing foot soak in warm organic milk, rose petals, and essential neroli oils.' },
      { stepNumber: 2, name: 'Volcanic Pumice & Walnut Buff', description: 'Gentle sloughing of calluses followed by walnut-saffron micro-buffing.' },
      { stepNumber: 3, name: 'Warm Shea & Saffron Massage', description: 'Pressure point foot and calf massage restoring circulation.' },
      { stepNumber: 4, name: 'Gold-Dust Oil & Non-Toxic Polish', description: 'Nourishing oil application with your choice of clean, long-wearing shades.' }
    ],
    botanicalIngredients: ['Organic Coconut Milk', 'Damask Rose Petals', 'Raw African Shea Butter', 'Himalayan Pink Salt Crystals'],
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80',
    bestFor: 'Tired, travel-worn feet, evening gala preparation, and soothing grounding therapy.'
  }
];

export const ADD_ON_BOOSTERS: AddOnBooster[] = [
  {
    id: 'addon-24k-gold-scalp',
    title: '24K Aurum Gold Leaf Scalp Seal',
    priceINR: 2200,
    durationMinutes: 15,
    description: 'Edible gold flakes massaged along the parting line with soothing botanical serum to boost cellular renewal and shine.',
    botanicalKey: 'Pure Aurum 24K'
  },
  {
    id: 'addon-singing-bowl',
    title: 'Tibetan Singing Bowl Sound Bath Intro',
    priceINR: 1500,
    durationMinutes: 15,
    description: 'Resonant sound vibrations placed on the crown and heart chakra to quiet the nervous system before ritual begins.',
    botanicalKey: 'Vibrational Acoustics'
  },
  {
    id: 'addon-jade-lymphatic',
    title: 'Jade Stone Lymphatic Eye Treatment',
    priceINR: 1800,
    durationMinutes: 20,
    description: 'Chilled hand-carved jade rollers and elderberry botanical concentrate to erase dark circles and puffiness.',
    botanicalKey: 'Elderberry & Cold Jade'
  },
  {
    id: 'addon-argan-gloss',
    title: 'Organic Moroccan Argan Gloss Shield',
    priceINR: 1200,
    durationMinutes: 10,
    description: 'Weightless finishing vapor providing humidity defense against Mumbai’s coastal air.',
    botanicalKey: 'Cold-Pressed Argan'
  }
];

export const ARTISANS: Artisan[] = [
  {
    id: 'meera-singhania',
    name: 'Meera Singhania',
    role: 'Creative Director',
    title: 'Master of Haute Coiffure & Texture Architecture',
    experienceYears: 14,
    locationIds: ['bandra-pali-hill', 'juhu-coastal'],
    specialty: 'Precision Dry-Cut Architecture, Balayage & Botanical Hair Restoration',
    bio: 'Trained at École de Coiffure Paris and Vidal Sassoon London, Meera is celebrated across Mumbai’s film and art circles for creating haircuts that age like fine linen—growing out with poise and organic effortless grace.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    rating: 4.98,
    reviewsCount: 312,
    signatureRitualId: 'kintsugi-hair-restoration',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 'vikramaditya-rao',
    name: 'Vikramaditya Rao',
    role: 'Master Trichologist',
    title: 'Head of Scalp Botanicals & Ayurvedic Trichology',
    experienceYears: 12,
    locationIds: ['bandra-pali-hill', 'colaba-heritage'],
    specialty: 'Hammam Scalp Ceremonies, Shirodhara & Follicular Health',
    bio: 'Bridging generational Ayurvedic lineage from Kerala with advanced British Trichology Society certifications, Vikram specializes in reversing Mumbai water and pollution damage through sacred botanical oils.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    rating: 4.96,
    reviewsCount: 268,
    signatureRitualId: 'moroccan-rosewood-head-spa',
    availableDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'ananya-deshmukh',
    name: 'Dr. Ananya Deshmukh',
    role: 'Senior Skin Alchemist',
    title: 'Cellular Aesthetician & Ayurvedic Cosmetologist',
    experienceYears: 11,
    locationIds: ['colaba-heritage', 'juhu-coastal'],
    specialty: 'Vedic Kumkumadi Radiance, Gua Sha Sculpting & Cryo Therapy',
    bio: 'Holding degrees in Ayurvedic Medicine and Swiss cosmetic formulation, Ananya curates facials that act at the cellular stratum without harsh acid peels, honoring the skin’s biological barrier.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    rating: 4.99,
    reviewsCount: 384,
    signatureRitualId: 'royal-kesar-cellular-glow',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'zarina-patel',
    name: 'Zarina Patel',
    role: 'Celebrity Couture Stylist',
    title: 'Bridal Heritage Director & Makeup Artisan',
    experienceYears: 15,
    locationIds: ['bandra-pali-hill', 'colaba-heritage', 'juhu-coastal'],
    specialty: 'Couture Bridal Styling, Royal Drape & Radiant Glow',
    bio: 'With works featured in Vogue India, Elle, and Grazia, Zarina creates timeless bridal expressions that reflect heirloom elegance rather than fleeting seasonal micro-trends.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 195,
    signatureRitualId: 'maharani-couture-bridal',
    availableDays: ['Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'silver-palm',
    name: 'The Silver Palm',
    tagline: 'Refined Essential Privileges',
    annualDuesINR: 45000,
    discountPercent: 10,
    complimentaryBlowouts: 6,
    valetPriority: true,
    champagneService: false,
    privateSuiteGuarantee: false,
    color: '#8C8284',
    perks: [
      '10% preferred privilege on all rituals & apothecary products',
      '6 complimentary Haute Silk Blowout sessions annually',
      'Priority reservation window during festive seasons (Diwali, Navratri)',
      'Complimentary welcome Ayurvedic botanical elixir on every visit'
    ]
  },
  {
    id: 'rosewood-circle',
    name: 'The Rosewood Circle',
    tagline: 'Mumbai Patrons Preferred Sanctuary',
    annualDuesINR: 95000,
    discountPercent: 15,
    complimentaryBlowouts: 12,
    valetPriority: true,
    champagneService: true,
    privateSuiteGuarantee: true,
    color: '#8C4A4A',
    perks: [
      '15% preferred privilege across all services and bespoke gift sets',
      '12 complimentary Haute Silk Blowout & Gloss sessions',
      'Guaranteed Private VIP Suite booking without additional room fees',
      'Complimentary Piper-Heidsieck champagne or artisan herbal infusions',
      'Dedicated personal concierge telephone desk'
    ]
  },
  {
    id: 'imperial-kesar',
    name: 'The Imperial Kesar Club',
    tagline: 'The Apex of Haute Beauty & Sovereign Luxury',
    annualDuesINR: 185000,
    discountPercent: 20,
    complimentaryBlowouts: 24,
    valetPriority: true,
    champagneService: true,
    privateSuiteGuarantee: true,
    color: '#DFBE9F',
    perks: [
      '20% premier privilege on all treatments, private vault bookings & products',
      '24 complimentary signature blowouts + 4 full bespoke facials',
      'Complimentary private chauffeur transfer (within Mumbai city limits)',
      'Direct Creative Director styling privileges with Meera Singhania',
      'Exclusive annual invitation to the Aura Private Salon Gala & Lookbook Launch'
    ]
  }
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Sunita Piramal',
    neighborhood: 'Malabar Hill, Mumbai',
    rating: 5,
    ritualName: 'Royal Kesar & Kumkumadi Cellular Glow',
    comment: 'The tranquility upon stepping into their Colaba heritage atelier is incomparable. Ananya’s facial left my skin glowing for ten straight days without a hint of redness.',
    date: 'October 2026'
  },
  {
    id: 'rev-2',
    clientName: 'Tara Mehta',
    neighborhood: 'Pali Hill, Bandra',
    rating: 5,
    ritualName: 'Kintsugi Botanical Hair Restoration',
    comment: 'Living by Bandra beach usually ruins my hair texture. Meera’s Kintsugi treatment completely revived the elasticity and mirror shine. The subtle sandalwood fragrance is divine.',
    date: 'September 2026'
  },
  {
    id: 'rev-3',
    clientName: 'Gayatri Singhania',
    neighborhood: 'Juhu Scheme, Mumbai',
    rating: 5,
    ritualName: 'Moroccan Rosewood Hammam Scalp Therapy',
    comment: 'The continuous warm water cascade with singing bowls cured months of work fatigue in ninety heavenly minutes. An absolute jewel of Mumbai wellness.',
    date: 'October 2026'
  }
];

export const INITIAL_DEMO_BOOKINGS: Booking[] = [
  {
    id: 'demo-booking-1',
    referenceCode: 'AURA-BND-7821',
    locationId: 'bandra-pali-hill',
    serviceId: 'kintsugi-hair-restoration',
    addOnIds: ['addon-24k-gold-scalp'],
    artisanId: 'meera-singhania',
    date: '2026-11-04',
    timeSlot: '11:30 AM',
    guestName: 'Kavita Chawla',
    guestPhone: '+91 98200 44219',
    guestEmail: 'kavita.c@mumbaidesign.in',
    fragranceNote: 'sandalwood_amber',
    teaPreference: 'kashmiri_kahwa',
    conciergeNotes: 'Prefers quiet session with soft Indian classical sarod in background.',
    membershipDiscountPercent: 15,
    totalPriceINR: 9095,
    createdAt: '2026-10-30T10:15:00Z',
    status: 'confirmed'
  }
];
