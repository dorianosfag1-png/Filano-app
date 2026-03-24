import { useState, useEffect, useRef } from "react";

// ══════════════════════════════════════════════════════════
// ZONES DATA
// ══════════════════════════════════════════════════════════
const ZONES = {
  "Afrique de l'Ouest (UEMOA/CEDEAO)": {
    currency: "FCFA", rateBank: "12–18%/an", rateIMF: "18–24%/an", imfMax: "50 000 000 FCFA",
    banks: [
      { n: "NSIA Banque Bénin", d: "Programme Keur Samba IFC/BOAD (52Mds FCFA, juil. 2025)" },
      { n: "Ecobank UEMOA", d: "Programme ELLEVER femmes entrepreneurs (IFC, mars 2025)" },
      { n: "Bank of Africa (BOA)", d: "Lignes PME dédiées, apport 20%, délai 3–6 semaines" },
      { n: "Orabank", d: "Prêts PME secteur informel, garantie FAGACE acceptée" },
      { n: "Coris Bank International", d: "Forte présence UEMOA, crédit court terme rapide" },
    ],
    imf: [
      { n: "PADME Bénin", d: "Prêts 500K–50M FCFA, 11 agences, focus MPME" },
      { n: "FINADEV Bénin", d: "Spécialiste MPME (IFC/FMO), tous secteurs incl. restauration" },
      { n: "FECECAM Bénin", d: "+30 agences, taux préférentiels agriculture/commerce" },
      { n: "FNM – Microcrédit Alafia", d: "Programme gouvernemental : 100K FCFA à 8%/an, mobile money" },
      { n: "PAPME", d: "Appui Développement Micro-Entreprises, Cotonou" },
    ],
    funds: [
      { n: "BOAD / Programme Keur Samba", d: "52 Mds FCFA opérationnel juil. 2025 pour PME UEMOA" },
      { n: "FAGACE", d: "Garantie jusqu'à 50% du prêt bancaire, réduit taux et garanties" },
      { n: "IFC West Africa", d: "56 Mds$ engagés en Afrique 2024 ; focus PME privées et femmes" },
      { n: "FAD/BAD – PAASF-UEMOA", d: "Don 11,25M$ (oct. 2024) pour 15 000 MPME via Connect-UEMOA" },
      { n: "AFD / Proparco – Choose Africa", d: "450M€ investis en Afrique 2023 ; PME, startups, dette" },
    ],
    investors: [
      { n: "I&P – IPAE 3", d: "41M€ levés déc. 2025, tickets 50K€–3M€, participation minoritaire" },
      { n: "Cauris Management – Fonds IV", d: "1ère société PE Afrique (28 ans), BOAD associé" },
      { n: "AfricInvest – Cathay Innovation", d: "Actif 2025, PME à fort potentiel" },
      { n: "Partech Africa", d: "Seed à Série B, startups tech Afrique Ouest" },
    ],
    programs: [
      { n: "BCEAO Réforme PME 2025–2030", d: "Amélioration accès crédit PME UEMOA, assouplissement garanties" },
      { n: "Connect-UEMOA", d: "15 000 MPME intégrées plateforme digitale inclusion financière" },
      { n: "Afreximbank PME 2026", d: "17,5 Mds$ en 2024, objectif 40 Mds$/an PME exportatrices" },
    ],
    tips: "🔑 2025 : Programme Keur Samba (BOAD/IFC, 52 Mds FCFA) opérationnel via NSIA Banque Bénin. FAGACE peut garantir 50% de votre prêt bancaire. I&P IPAE 3 (41M€, déc. 2025) : tickets 50K€–3M€ pour PME Afrique Ouest.",
  },
  "Afrique Centrale (CEMAC)": {
    currency: "FCFA", rateBank: "14–22%/an", rateIMF: "20–28%/an", imfMax: "5 000 000 FCFA",
    banks: [{ n: "BGFI Bank", d: "Leader CEMAC, financement PME structurants" }, { n: "Ecobank CEMAC", d: "Réseau régional, lignes PME disponibles" }, { n: "UBA Cameroun/Congo", d: "Prêts PME, forte présence régionale" }],
    imf: [{ n: "MC2", d: "Spécialiste microfinance Cameroun, crédit solidaire" }, { n: "CAMCCUL", d: "Coopérative crédit Cameroun" }, { n: "ACEP Cameroun", d: "Prêts PME et micro-entreprises" }],
    funds: [{ n: "BDEAC", d: "Financement projets régionaux CEMAC" }, { n: "BAD Programme PME", d: "Lignes de crédit via banques partenaires" }],
    investors: [{ n: "I&P Afrique Entrepreneurs", d: "Tickets 50K€–3M€, actif Afrique centrale" }, { n: "AfricInvest", d: "PME à fort potentiel de croissance" }],
    programs: [{ n: "MINPMEESA Cameroun", d: "Accompagnement et financement PME" }, { n: "AFD Afrique Centrale", d: "Garanties via banques partenaires" }],
    tips: "En zone CEMAC, le secteur agricole bénéficie de financements privilégiés. BDEAC finance les projets régionaux. Apport personnel recommandé : 25–30%.",
  },
  "Afrique de l'Est": {
    currency: "USD / KES", rateBank: "13–20%/an", rateIMF: "18–26%/an", imfMax: "USD 50,000",
    banks: [{ n: "Equity Bank Kenya", d: "Leader financement PME Afrique Est" }, { n: "KCB Group", d: "Présence régionale forte, lignes PME" }, { n: "CRDB Bank Tanzania", d: "Prêts PME, secteur agricole et commercial" }],
    imf: [{ n: "Kenya Women Finance Trust", d: "Focus femmes entrepreneurs" }, { n: "Vision Fund East Africa", d: "Réseau régional PME/agriculture" }, { n: "BRAC East Africa", d: "Microfinance et accompagnement" }],
    funds: [{ n: "EADB", d: "Financement PME régionales Afrique Est" }, { n: "IFC East Africa", d: "Investissements directs et garanties" }],
    investors: [{ n: "Novastar Ventures", d: "VC impact, seed à série A" }, { n: "Savannah Fund", d: "Focus tech East Africa" }],
    programs: [{ n: "Mastercard Foundation", d: "Appui entrepreneuriat jeunes" }, { n: "USAID DCA Guarantees", d: "Garanties de crédit PME" }],
    tips: "Le Kenya est le hub fintech d'Afrique de l'Est (M-Pesa). Equity Bank finance les PME sans garanties lourdes.",
  },
  "Afrique du Nord & Maghreb": {
    currency: "MAD / TND / DZD", rateBank: "6–12%/an", rateIMF: "12–18%/an", imfMax: "USD 30,000",
    banks: [{ n: "Attijariwafa Bank", d: "1er groupe bancaire Afrique du Nord" }, { n: "BMCE Bank of Africa", d: "Présence panafricaine, financement PME" }, { n: "BNA Tunisie", d: "Financement PME soutenu BFPME/SOTUGAR" }],
    imf: [{ n: "Al Amana Microfinance (Maroc)", d: "Prêts jusqu'à 150K MAD" }, { n: "Enda Tamweel (Tunisie)", d: "Spécialiste microcrédit PME" }],
    funds: [{ n: "Maroc PME (CDG)", d: "Subventions, cofinancements PME marocaines" }, { n: "BFPME + SOTUGAR Tunisie", d: "Financement PME avec garantie publique" }],
    investors: [{ n: "AfricInvest (Tunis)", d: "Pioneer PE Afrique, 35+ pays" }, { n: "Mediterrania Capital", d: "Capital développement PME" }],
    programs: [{ n: "Programme ANPME Maroc", d: "Mise à niveau et financement PME" }, { n: "Horizon Europe PME", d: "Subventions PME innovantes" }],
    tips: "Le Maroc est le hub financier de l'Afrique francophone. BFPME Tunisie finance avec garantie SOTUGAR jusqu'à 70% du projet.",
  },
  "Europe (France / Belgique / Suisse)": {
    currency: "EUR", rateBank: "3–7%/an", rateIMF: "5–9%/an", imfMax: "12 000 EUR",
    banks: [{ n: "BPI France", d: "Partenaire clé PME françaises, prêts sans garantie" }, { n: "Crédit Agricole", d: "Forte présence PME, offres créateur" }, { n: "BNP Paribas Fortis", d: "Belgique, accompagnement création entreprise" }],
    imf: [{ n: "ADIE (France)", d: "Microcrédits jusqu'à 12 000€ sans garantie" }, { n: "France Active", d: "Garanties et fonds pour créateurs" }, { n: "Réseau Entreprendre", d: "Prêts d'honneur 0% jusqu'à 50K€ + mentorat" }],
    funds: [{ n: "BPI France – Pass PE", d: "Prêts participatifs, garanties, fonds propres" }, { n: "Banque des Territoires", d: "Financement projets locaux et ESS" }],
    investors: [{ n: "France Angels", d: "Réseau Business Angels, 50K–500K€" }, { n: "Eurazeo / Tikehau", d: "Fonds PE mid-market" }],
    programs: [{ n: "ACRE", d: "Exonération charges sociales 1ère année" }, { n: "Horizon Europe", d: "Subventions jusqu'à 2,5M€ PME R&D" }],
    tips: "BPIFrance est votre meilleur allié. L'ADIE finance jusqu'à 12 000€ sans garantie. Réseau Entreprendre : prêts 0% jusqu'à 50K€ avec mentorat.",
  },
  "Amérique du Nord (USA / Canada)": {
    currency: "USD / CAD", rateBank: "5–9%/an", rateIMF: "7–12%/an", imfMax: "USD 50,000",
    banks: [{ n: "BDC Canada", d: "Prêts flexibles jusqu'à 1M CAD" }, { n: "JPMorgan Chase / BofA", d: "SBA loan programs USA" }],
    imf: [{ n: "ACCION USA", d: "Microcrédits PME jusqu'à 50K$" }, { n: "Grameen America", d: "Microcrédit femmes entrepreneurs" }],
    funds: [{ n: "SBA (Small Business Administration)", d: "Prêts garantis 7(a) jusqu'à 5M$" }, { n: "SBIC Program", d: "Capital-risque et développement PME" }],
    investors: [{ n: "Y Combinator / 500 Startups", d: "Accélérateurs mondiaux, 125K–500K$" }, { n: "AngelList", d: "Plateforme Business Angels thématiques" }],
    programs: [{ n: "SBA Microloan Program", d: "Jusqu'à 50K$ via intermédiaires locaux" }, { n: "SBIR / STTR Grants", d: "Subventions gouvernementales R&D jusqu'à 1,5M$" }],
    tips: "SBA 7(a) est le levier clé PME aux USA. Y Combinator accepte des projets du monde entier. BDC Canada : prêts PME flexibles et rapides.",
  },
};

// ══════════════════════════════════════════════════════════
// FISCAL & TAX RULES BY ZONE (normes bancaires 2025)
// ══════════════════════════════════════════════════════════
const TAX_RULES = {
  "Afrique de l'Ouest (UEMOA/CEDEAO)": {
    isRate:0.30, minTaxRate:0.01, vatRate:0.18, socialRate:0.172, patente:0.00287,
    deprecRates:{immobilier:0.05,equipement:0.20,vehicules:0.25,informatique:0.33,mobilier:0.10},
    wcr:{receivableDays:30,stockDays:45,payableDays:60},
    wacc:0.18, loanRate:0.155, equityPremium:0.08,
    regimes:["SARL","SA","SNC/SCS","GIE","Entreprise Individuelle"],
    countryRates:{"Bénin":0.30,"Côte d'Ivoire":0.25,"Sénégal":0.30,"Togo":0.28,"Burkina Faso":0.275,"Mali":0.30,"Niger":0.30},
    vatLabel:"TVA 18% (UEMOA)",
    notes:"IS Bénin 30% (min. forfait. 1% CA). TVA 18%. CNSS pat. 15.4%+AT 1.75%. Patente synthétique. Amort. linéaire SYSCOHADA."
  },
  "Afrique Centrale (CEMAC)": {
    isRate:0.30, minTaxRate:0.022, vatRate:0.1925, socialRate:0.17, patente:0.004,
    deprecRates:{immobilier:0.05,equipement:0.20,vehicules:0.25,informatique:0.33,mobilier:0.10},
    wcr:{receivableDays:45,stockDays:60,payableDays:60},
    wacc:0.20, loanRate:0.18, equityPremium:0.10,
    regimes:["SARL","SA","SNC","GIE"],
    countryRates:{"Cameroun":0.30,"Congo":0.30,"Gabon":0.30,"Tchad":0.35,"RCA":0.30},
    vatLabel:"TVA 19.25% (Cameroun)",
    notes:"IS Cameroun 30% (min. 2.2% CA). TVA 19.25%. Cotisations sociales ~17%. OHADA SYSCOHADA."
  },
  "Afrique de l'Est": {
    isRate:0.30, minTaxRate:0.01, vatRate:0.16, socialRate:0.15, patente:0.002,
    deprecRates:{immobilier:0.025,equipement:0.125,vehicules:0.25,informatique:0.30,mobilier:0.125},
    wcr:{receivableDays:30,stockDays:30,payableDays:45},
    wacc:0.18, loanRate:0.155, equityPremium:0.08,
    regimes:["Ltd Company","PLC","Partnership","Sole Proprietor"],
    countryRates:{"Kenya":0.30,"Tanzanie":0.30,"Ouganda":0.30,"Éthiopie":0.30,"Rwanda":0.30},
    vatLabel:"VAT 16% (Kenya)",
    notes:"Corporate Tax Kenya 30%. VAT 16%. NHIF+NSSF employer ~15%. IFRS SME standard."
  },
  "Afrique du Nord & Maghreb": {
    isRate:0.20, minTaxRate:0.005, vatRate:0.20, socialRate:0.212, patente:0.002,
    deprecRates:{immobilier:0.04,equipement:0.15,vehicules:0.20,informatique:0.25,mobilier:0.15},
    wcr:{receivableDays:60,stockDays:45,payableDays:60},
    wacc:0.13, loanRate:0.065, equityPremium:0.06,
    regimes:["SARL","SA","Auto-Entrepreneur","SNC","SCS"],
    countryRates:{"Maroc":0.20,"Tunisie":0.20,"Algérie":0.26,"Égypte":0.225},
    vatLabel:"TVA 20% (Maroc)",
    notes:"IS Maroc 20% PME (<100M MAD). CNSS patronale 21.09%+AMO 4.11%. Norme CNC / IAS PME."
  },
  "Europe (France / Belgique / Suisse)": {
    isRate:0.25, minTaxRate:0, vatRate:0.20, socialRate:0.45, patente:0,
    deprecRates:{immobilier:0.025,equipement:0.20,vehicules:0.20,informatique:0.33,mobilier:0.10},
    wcr:{receivableDays:45,stockDays:30,payableDays:60},
    wacc:0.10, loanRate:0.052, equityPremium:0.05,
    regimes:["SASU","SAS","SARL","EURL","Micro-entreprise","SA"],
    countryRates:{"France":0.25,"Belgique":0.25,"Suisse":0.085,"Luxembourg":0.17},
    vatLabel:"TVA 20% (France)",
    notes:"IS France 25% (15% jusqu'à 42 500€). Charges patronales ~45% brut. PCG IFRS / normes ANC."
  },
  "Amérique du Nord (USA / Canada)": {
    isRate:0.21, minTaxRate:0, vatRate:0, socialRate:0.0765, patente:0,
    deprecRates:{immobilier:0.025,equipement:0.20,vehicules:0.20,informatique:0.33,mobilier:0.10},
    wcr:{receivableDays:30,stockDays:30,payableDays:30},
    wacc:0.10, loanRate:0.072, equityPremium:0.05,
    regimes:["LLC","C-Corp","S-Corp","Sole Proprietor","Partnership"],
    countryRates:{"USA":0.21,"Canada":0.265},
    vatLabel:"Sales Tax (variable par État)",
    notes:"Federal CT 21% USA. FICA employer 7.65%. State taxes 0–9.99%. US GAAP / IFRS."
  }
};

// ══════════════════════════════════════════════════════════
// ROADMAP & STRATEGY DATA
// ══════════════════════════════════════════════════════════
function getRoadmapData(typeProjet, data) {
  const t = (typeProjet || "").toLowerCase();

  const isFood = /restaurant|aliment|resto|café|boulang|traiteur/i.test(t);
  const isTech = /tech|app|logiciel|digital|saas|plateforme|software/i.test(t);
  const isAgri = /agri|élevage|farm|culture|maraich|avicul/i.test(t);
  const isTrade = /commerce|boutique|import|export|négoce|distribution/i.test(t);
  const isService = /service|consult|cabinet|agence|formation|éducation/i.test(t);
  const isBTP = /btp|construction|bâtiment|immobilier|travaux/i.test(t);
  const isHealth = /santé|pharma|clinique|médical|soins/i.test(t);

  // ── ROADMAP PHASES ────────────────────────────────────────
  const roadmaps = {
    food: [
      { phase: "Phase 0", label: "Pré-lancement", duration: "M1–M2", color: "#4a9eff", icon: "🔧",
        tasks: ["Finaliser le local et les travaux d'aménagement", "Obtenir licences (registre commerce, hygiène, ANPE)", "Commander et installer les équipements cuisine", "Recruter et former le personnel clé (cuisinier, serveurs)", "Constituer le stock de démarrage", "Créer page Facebook/Instagram + Google Maps"],
        kpi: "Local opérationnel, équipe formée, licences obtenues" },
      { phase: "Phase 1", label: "Lancement (Soft Open)", duration: "M3", color: "#f0a500", icon: "🚀",
        tasks: ["Semaine 1–2 : Ouverture douce (famille, amis, entourage)", "Recueillir les premiers avis et ajuster les recettes", "Tester la chaîne d'approvisionnement", "Semaine 3–4 : Ouverture officielle + événement inaugural", "Distribution de flyers dans un rayon de 500m", "Offre de lancement : -20% pendant 2 semaines"],
        kpi: "30+ couverts/jour, 4★ Google, 0 rupture de stock" },
      { phase: "Phase 2", label: "Croissance", duration: "M4–M6", color: "#2ecc8a", icon: "📈",
        tasks: ["Activer la livraison à domicile (moto-taxi, Glovo si dispo)", "Lancer programme de fidélité (10e repas offert)", "Cibler les entreprises voisines pour les déjeuners d'affaires", "Posts quotidiens sur Instagram (stories des plats)", "Négocier des contrats traiteur mensuels"],
        kpi: "70+ couverts/jour, CA ≥ objectif mois 1, 60% clients récurrents" },
      { phase: "Phase 3", label: "Consolidation", duration: "M7–M12", color: "#e05c2a", icon: "🏆",
        tasks: ["Atteindre l'équilibre financier et rembourser les prêts en avance", "Former un 2e cuisinier (réduire dépendance clé)", "Introduire un menu du jour à prix fixe (rotation rapide)", "Envisager une 2e table ou extension de la salle", "Certification hygiène (renforce la confiance des entreprises)"],
        kpi: "ROI positif, taux d'occupation 80%, réserve 3 mois charges" },
      { phase: "Phase 4", label: "Expansion", duration: "An 2+", color: "#9b59b6", icon: "🌍",
        tasks: ["Ouvrir un 2e point de vente (quartier différent)", "Lancer une offre de franchise ou licence de marque", "Développer une gamme de produits à emporter (sauces, plats surgelés)", "S'inscrire sur Jumia Food / Glovo si disponibles", "Candidater à des prix PME locaux pour la visibilité"],
        kpi: "2 points de vente rentables, marque reconnue, +30% CA" },
    ],
    tech: [
      { phase: "Phase 0", label: "Validation & MVP", duration: "M1–M3", color: "#4a9eff", icon: "🔬",
        tasks: ["Interviews utilisateurs (min. 20 entretiens)", "Définir les 3 fonctionnalités core du MVP", "Développer le MVP (no-code ou dev minimaliste)", "Déployer en beta privée (50 utilisateurs cibles)", "Mesurer le taux d'usage et de rétention hebdo"],
        kpi: "MVP live, 50 beta users, rétention J7 > 40%" },
      { phase: "Phase 1", label: "Product-Market Fit", duration: "M4–M6", color: "#f0a500", icon: "🎯",
        tasks: ["Itérer sur le feedback des beta users (1 sprint/semaine)", "Atteindre un NPS > 40 (niveau recommandation)", "Choisir un canal d'acquisition principal (SEO, WhatsApp, B2B direct)", "Atteindre 200 utilisateurs actifs payants ou engagés", "Documenter les cas d'usage qui convertissent le mieux"],
        kpi: "200 users actifs, NPS > 40, churn < 10%/mois" },
      { phase: "Phase 2", label: "Traction & Revenus", duration: "M7–M12", color: "#2ecc8a", icon: "📈",
        tasks: ["Lancer un modèle Freemium ou abonnement mensuel", "Partenariats avec 5 entreprises/associations clés", "Contenu éducatif (LinkedIn, YouTube) pour crédibilité", "Premier tour de table (pré-seed) ou subvention startup", "Recruter un commercial ou CSM pour les comptes B2B"],
        kpi: "MRR > 0, 10 clients payants B2B ou 500 freemium, ARR visible" },
      { phase: "Phase 3", label: "Scale", duration: "An 2", color: "#e05c2a", icon: "🚀",
        tasks: ["Lever des fonds (seed round, I&P, Partech, accélérateur)", "Automatiser le marketing et l'onboarding", "Recruter une équipe core (CTO/dev, growth, support)", "Expansion géographique (2e pays ou ville)", "Candidater à YC, Orange Corners, incubateurs locaux"],
        kpi: "ARR × 3, équipe 5+, 2e marché adressé" },
    ],
    agri: [
      { phase: "Phase 0", label: "Préparation terrain", duration: "M1–M2", color: "#4a9eff", icon: "🌱",
        tasks: ["Préparer et fertiliser les terres / installer les infrastructures", "Commander semences, intrants, équipements certifiés", "Mettre en place le système d'irrigation si nécessaire", "Identifier les acheteurs potentiels (marchés, restaurants, export)", "Constituer ou rejoindre une coopérative"],
        kpi: "Terres prêtes, intrants disponibles, acheteurs identifiés" },
      { phase: "Phase 1", label: "1er cycle de production", duration: "M3–M5", color: "#f0a500", icon: "🌾",
        tasks: ["Lancement de la production (semis ou mise en place élevage)", "Suivi hebdomadaire rendement et santé des cultures/animaux", "Négocier les contrats de vente directe (prix garanti)", "Tester un premier marché local ou grossiste", "Documenter les coûts réels vs estimations"],
        kpi: "1er cycle complété, rendement ≥ 80% de l'objectif" },
      { phase: "Phase 2", label: "Commercialisation", duration: "M6–M9", color: "#2ecc8a", icon: "📦",
        tasks: ["Vendre la production : marchés locaux + grossistes + restaurants", "Explorer la transformation à valeur ajoutée (conserves, séchage)", "S'inscrire dans un programme de certification (Bio, HACCP)", "Rejoindre une plateforme digitale agricole (Hello Tractor, Esoko)", "Calculer le coût de revient réel et ajuster pour le 2e cycle"],
        kpi: "80% de la production vendue, marge ≥ prévision" },
      { phase: "Phase 3", label: "Montée en échelle", duration: "An 2", color: "#e05c2a", icon: "🏭",
        tasks: ["Augmenter la surface ou le cheptel de 50%", "Installer une mini-unité de transformation (valeur ajoutée)", "Accéder aux marchés d'exportation (UEMOA, UE)", "Solliciter un financement BOAD / FAO pour l'équipement", "Former d'autres agriculteurs locaux (leadership et réseautage)"],
        kpi: "Production × 1.5, transformation démarrée, 1 contrat export" },
    ],
    trade: [
      { phase: "Phase 0", label: "Sourcing & Logistique", duration: "M1–M2", color: "#4a9eff", icon: "📦",
        tasks: ["Négocier avec 3 fournisseurs minimum (ne jamais dépendre d'un seul)", "Calculer le coût de revient complet (achat + transport + taxes + douane)", "Trouver et aménager le local commercial / entrepôt", "Obtenir patente, registre commerce, agréments douaniers si import", "Identifier les 5 plus gros clients potentiels dès maintenant"],
        kpi: "2 fournisseurs confirmés, local opérationnel, agréments OK" },
      { phase: "Phase 1", label: "Lancement commercial", duration: "M3–M4", color: "#f0a500", icon: "🏪",
        tasks: ["Ouvrir le point de vente avec stock initial varié", "Offre d'ouverture : -15% la 1ère semaine, frais de livraison offerts", "Démarcher personnellement les 10 premiers clients B2B", "Être présent sur les marchés hebdomadaires locaux", "Créer un catalogue produits avec prix WhatsApp Business"],
        kpi: "10 premiers clients actifs, stock rotation < 30 jours" },
      { phase: "Phase 2", label: "Développement réseau", duration: "M5–M9", color: "#2ecc8a", icon: "🤝",
        tasks: ["Recruter 2–3 agents commerciaux terrain (commission)", "Proposer la livraison à domicile et les commandes WhatsApp", "Mettre en place un système de crédit fournisseur (30 jours)", "Négocier des conditions préférentielles avec les meilleurs fournisseurs", "Développer l'import direct pour couper les intermédiaires"],
        kpi: "50+ clients réguliers, marge améliorée de 5 points" },
      { phase: "Phase 3", label: "Expansion", duration: "An 2", color: "#e05c2a", icon: "🌍",
        tasks: ["Ouvrir un 2e point de vente ou agence régionale", "Digitaliser les commandes (application ou site simple)", "Construire ou louer un entrepôt de stockage dédié", "Prospecter les marchés sous-régionaux (UEMOA, CEDEAO)", "Formaliser les contrats avec les 10 meilleurs clients"],
        kpi: "2e point de vente, volume × 2, 1 contrat sous-régional" },
    ],
    service: [
      { phase: "Phase 0", label: "Positionnement & Offre", duration: "M1", color: "#4a9eff", icon: "🎯",
        tasks: ["Définir clairement les 3 offres avec prix et livrables", "Créer le portfolio / site web vitrine (1 page suffit)", "Identifier les 10 prospects idéaux et leurs problèmes", "Préparer un deck de présentation client (5 slides max)", "Rejoindre 2–3 associations professionnelles locales"],
        kpi: "Offres claires, site en ligne, 10 prospects ciblés" },
      { phase: "Phase 1", label: "Acquisition des premiers clients", duration: "M2–M3", color: "#f0a500", icon: "🤝",
        tasks: ["Proposer une mission pilote à prix réduit (démonstration de valeur)", "Contacter chaque prospect par recommandation directe", "Publier 1 cas d'usage / témoignage par semaine sur LinkedIn", "Rejoindre les groupes WhatsApp professionnels du secteur", "Participer à 1 événement networking/mois"],
        kpi: "3 premiers clients payants, 1 témoignage écrit" },
      { phase: "Phase 2", label: "Récurrence & Références", duration: "M4–M9", color: "#2ecc8a", icon: "📈",
        tasks: ["Transformer les missions ponctuelles en contrats récurrents (retainer)", "Demander 2 recommandations à chaque client satisfait", "Développer une offre de formation ou atelier (scalable)", "Contenu thought leadership : articles, podcasts, conférences", "Recruter un 1er collaborateur ou freelance"],
        kpi: "5+ clients récurrents, 60% du CA en contrats annuels" },
      { phase: "Phase 3", label: "Structuration", duration: "An 2", color: "#e05c2a", icon: "🏢",
        tasks: ["Formaliser les processus et créer des templates de livrables", "Lancer un produit digital (formation en ligne, outil SaaS)", "Recruter une équipe de 3–5 consultants senior", "Décrocher un contrat institutionnel (ONG, gouvernement, multinationale)", "Construire une marque employeur attractive"],
        kpi: "CA × 2, équipe 5+, 1 contrat institutionnel" },
    ],
    btp: [
      { phase: "Phase 0", label: "Structuration & Agrément", duration: "M1–M2", color: "#4a9eff", icon: "📋",
        tasks: ["Obtenir les agréments techniques et inscription à l'ordre des ingénieurs", "Constituer un dossier de références (même petites missions)", "Acquérir ou louer l'équipement de base (sécuriser un partenaire engins)", "Recruter un chef de chantier expérimenté en CDI", "Identifier 5 maîtres d'ouvrage potentiels (particuliers, entreprises, mairies)"],
        kpi: "Agrément obtenu, équipement opérationnel, 5 contacts maîtres d'ouvrage" },
      { phase: "Phase 1", label: "1ers chantiers", duration: "M3–M6", color: "#f0a500", icon: "🏗️",
        tasks: ["Soumissionner à des appels d'offres de petites collectivités", "Réaliser 2–3 chantiers résidentiels de démonstration", "Documenter chaque chantier (photos avant/après, délais, budget)", "Proposer la transparence totale sur les coûts (confiance client)", "Mettre en place un système de suivi de chantier numérique"],
        kpi: "2 chantiers livrés dans les délais et budget, 0 litige" },
      { phase: "Phase 2", label: "Montée en puissance", duration: "M7–M18", color: "#2ecc8a", icon: "📈",
        tasks: ["Se spécialiser sur 1 niche (ex: logements sociaux, réhabilitation, route)", "Participer aux marchés publics locaux (DNCMP, DMP)", "Construire un partenariat avec un bureau d'études", "Mettre en place un financement fournisseurs (30–60 jours)", "Former et certifier vos ouvriers (qualité et sécurité)"],
        kpi: "3 chantiers simultanés, 1 marché public remporté" },
      { phase: "Phase 3", label: "Expansion", duration: "An 3+", color: "#e05c2a", icon: "🌍",
        tasks: ["Acquérir des équipements lourds (financement leasing)", "Créer une filiale spécialisée (ex: BTP + promotion immobilière)", "Développer l'activité dans d'autres régions ou pays voisins", "Décrocher un contrat d'envergure (projet BAD, Banque Mondiale)", "Constituer un consortium avec d'autres PME locales"],
        kpi: "Carnet de commandes 12 mois, équipement propre, 1 projet international" },
    ],
    health: [
      { phase: "Phase 0", label: "Conformité & Installation", duration: "M1–M3", color: "#4a9eff", icon: "🏥",
        tasks: ["Obtenir toutes les autorisations sanitaires (Ministère Santé, Ordre)", "Aménager les espaces selon les normes sanitaires nationales", "Recruter le personnel médical et paramédical agréé", "Négocier les contrats avec les laboratoires et fournisseurs pharma", "Mettre en place le système de gestion des patients (logiciel)"],
        kpi: "Autorisations complètes, personnel recruté, infrastructure normée" },
      { phase: "Phase 1", label: "Lancement & Sensibilisation", duration: "M4–M6", color: "#f0a500", icon: "🚀",
        tasks: ["Journée portes ouvertes + campagne de sensibilisation locale", "Partenariats avec écoles et entreprises voisines (visites de santé)", "Affiliation à une mutuelle de santé ou assurance maladie nationale", "Communiquer sur les services spécialisés peu disponibles localement", "Tarification sociale pour attirer et fidéliser les ménages modestes"],
        kpi: "50+ patients/mois, 1 convention entreprise signée" },
      { phase: "Phase 2", label: "Développement de la patientèle", duration: "M7–M18", color: "#2ecc8a", icon: "📈",
        tasks: ["Développer la télémédecine pour les zones reculées", "Créer un programme de fidélisation (carnet de santé famille)", "Former les agents de santé communautaires (extension géographique)", "Proposer des forfaits annuels pour les familles et entreprises", "S'inscrire dans les programmes nationaux de santé publique"],
        kpi: "150+ patients/mois, 3 conventions signées, 80% taux satisfaction" },
      { phase: "Phase 3", label: "Expansion", duration: "An 2+", color: "#9b59b6", icon: "🌐",
        tasks: ["Ouvrir une clinique spécialisée (maternité, cardiologie, etc.)", "Développer un réseau de points de santé satellites", "Exporter l'expertise vers d'autres pays de la zone UEMOA", "Levée de fonds auprès d'IFC Health ou d'investisseurs impact", "Partenariat avec une université pour la formation médicale"],
        kpi: "2e structure, 500+ patients/mois, impact mesuré et documenté" },
    ],
    default: [
      { phase: "Phase 0", label: "Fondations", duration: "M1–M2", color: "#4a9eff", icon: "🔧",
        tasks: ["Finaliser les démarches légales et administratives", "Mettre en place l'infrastructure opérationnelle de base", "Recruter les ressources humaines clés", "Définir les processus opérationnels essentiels", "Préparer la communication et les outils marketing"],
        kpi: "Entité légale créée, équipe en place, outils prêts" },
      { phase: "Phase 1", label: "Lancement", duration: "M3–M4", color: "#f0a500", icon: "🚀",
        tasks: ["Lancer les opérations et acquérir les 10 premiers clients", "Tester et affiner l'offre selon les retours terrain", "Mettre en place le suivi des KPIs hebdomadaires", "Activer le réseau personnel et professionnel", "Réaliser une offre de lancement attractive"],
        kpi: "10 premiers clients, offre validée, KPIs suivis" },
      { phase: "Phase 2", label: "Croissance", duration: "M5–M12", color: "#2ecc8a", icon: "📈",
        tasks: ["Systématiser l'acquisition client et la satisfaction", "Développer des partenariats stratégiques", "Optimiser les coûts et améliorer la marge", "Fidéliser les clients existants (programme récurrence)", "Préparer l'expansion ou la diversification"],
        kpi: "Objectif CA atteint, marge positive, 3+ partenariats" },
      { phase: "Phase 3", label: "Consolidation & Scale", duration: "An 2+", color: "#e05c2a", icon: "🌍",
        tasks: ["Consolider la position de marché", "Lancer de nouveaux produits ou marchés géographiques", "Structurer l'organisation et renforcer l'équipe", "Envisager un tour de financement ou une expansion régionale", "Bâtir une marque reconnue dans le secteur"],
        kpi: "Leader régional, CA × 2, équipe structurée" },
    ],
  };

  // ── MARKET PENETRATION STRATEGIES ────────────────────────
  const strategies = {
    food: {
      positioning: "Différenciation qualité + commodité (livraison rapide, cadre moderne)",
      pricing: "Prix légèrement au-dessus du marché informel, en-dessous des restaurants formels (segment intermédiaire)",
      channels: [
        { n: "Marketing de proximité", d: "Flyers, bouche-à-oreille, présence physique dans un rayon de 500m–1km" },
        { n: "WhatsApp Business", d: "Commandes, menu du jour, promos, numéro dédié avec catalogue" },
        { n: "Réseaux sociaux locaux", d: "Instagram et Facebook : stories quotidiennes des plats, UGC clients" },
        { n: "Google My Business", d: "Référencement local gratuit indispensable — les clients cherchent 'restaurant près de moi'" },
        { n: "Partenariats B2B", d: "Contrats déjeuners avec entreprises et administrations voisines (revenus récurrents)" },
      ],
      penetration: [
        { strategy: "Pénétration par le prix", desc: "Offre de lancement -15 à -20% pendant 2 semaines pour créer le flux initial et les habitudes" },
        { strategy: "Programme de fidélité simple", desc: "Carte de fidélité physique : 10e repas gratuit. Coût quasi nul, rétention forte." },
        { strategy: "Pivot 'Traiteur d'entreprise'", desc: "Démarcher les 20 entreprises dans un rayon de 2km pour les déjeuners d'affaires. Revenu fixe mensuel." },
        { strategy: "Effet de réseau communautaire", desc: "Impliquer les associations de quartier, les groupes de femmes, les tontines comme ambassadeurs." },
      ],
      kpis_cles: ["Taux de retour clients (objectif > 50%)", "Note Google (objectif > 4.2★)", "CA livraison vs. sur place", "Coût d'acquisition client (CAC)"],
    },
    tech: {
      positioning: "Solution spécialisée répondant à un problème non résolu dans le marché local",
      pricing: "Modèle Freemium (acquisition gratuite) + Premium (conversion payante) OU abonnement SaaS mensuel",
      channels: [
        { n: "Growth Hacking B2B direct", d: "Contacter directement les décideurs via LinkedIn, WhatsApp, email personnalisé" },
        { n: "Content Marketing (SEO)", d: "Articles, vidéos YouTube répondant aux problèmes cibles — trafic organique durable" },
        { n: "Partenariats d'intégration", d: "S'associer à des outils déjà utilisés (Mobile Money, ERP locaux) pour les distribution" },
        { n: "Communautés & Forums", d: "WhatsApp groups, Discord, groupes Facebook des cibles — présence organique" },
        { n: "Influenceurs business", d: "Collaborer avec des entrepreneurs influents locaux (micro-influenceurs B2B)" },
      ],
      penetration: [
        { strategy: "Land & Expand", desc: "Commencer par un département ou une équipe dans l'entreprise cliente, puis s'étendre à toute l'organisation." },
        { strategy: "Bottom-up (viral)", desc: "Les utilisateurs adoptent l'outil individuellement, créent un effet d'entraînement vers l'entreprise." },
        { strategy: "Pilot gratuit 30 jours", desc: "POC gratuit chez 5 entreprises cibles stratégiques — crée des références et des cas d'usage." },
        { strategy: "API & Marketplace", desc: "Intégrer sur des marketplaces existantes (Jumia, etc.) ou exposer une API pour les développeurs." },
      ],
      kpis_cles: ["MRR (Monthly Recurring Revenue)", "Churn rate mensuel (objectif < 5%)", "CAC / LTV ratio (objectif LTV > 3× CAC)", "NPS (Net Promoter Score)"],
    },
    agri: {
      positioning: "Qualité certifiée + traçabilité + livraison directe aux acheteurs (couper les intermédiaires)",
      pricing: "Prix légèrement supérieur au marché si certification présente ; sinon prix marché avec volume",
      channels: [
        { n: "Vente directe aux restaurants", d: "Démarcher directement les restaurants et hôtels — prix 20% supérieur au grossiste" },
        { n: "Marchés hebdomadaires", d: "Présence régulière sur les marchés clés de la région — visibilité et cash rapide" },
        { n: "Coopérative et GIE", d: "Rejoindre ou créer une structure collective pour accéder aux marchés institutionnels" },
        { n: "Export sous-régional", d: "Identifier les opportunités d'export vers les pays voisins via les corridors UEMOA" },
        { n: "Plateformes digitales agri", d: "Esoko, Hello Tractor, AgriFinance — référencer ses produits et trouver des acheteurs" },
      ],
      penetration: [
        { strategy: "Contrats d'approvisionnement garanti", desc: "Signer des contrats à prix fixe avec 3–5 acheteurs avant même la production. Sécurise le revenu." },
        { strategy: "Valeur ajoutée (transformation)", desc: "Transformer une partie de la production (conserves, jus, séchage) pour multiplier la marge par 2–5." },
        { strategy: "Label et certification", desc: "Obtenir une certification (Bio, IG, commerce équitable) pour accéder aux marchés premium et à l'export." },
        { strategy: "Agriculture contractuelle", desc: "Proposer aux acheteurs institutionnels (hôtels, cantines scolaires, armée) un approvisionnement régulier." },
      ],
      kpis_cles: ["Rendement par hectare vs. objectif", "% production vendue à prix premium", "Coût de production/kg", "Durée moyenne de vente post-récolte"],
    },
    trade: {
      positioning: "Meilleur service, stock disponible, livraison rapide — pas forcément le moins cher",
      pricing: "Alignement marché sur le premier mois, puis légère prime pour le service (livraison, crédit, fiabilité)",
      channels: [
        { n: "Force de vente terrain", d: "Agents commerciaux payés à la commission — couvrent un territoire défini, connaissent les clients" },
        { n: "WhatsApp Business Pro", d: "Catalogue produits, commandes, devis instantanés — canal roi pour le commerce en Afrique" },
        { n: "Fidélisation B2B", d: "Conditions préférentielles pour les revendeurs (remise sur volume, crédit 30 jours)" },
        { n: "Présence sur Jumia/Glovo", d: "Référencement sur les plateformes e-commerce locales pour toucher de nouveaux clients" },
        { n: "Réseau de sous-distributeurs", d: "Former un réseau de petits revendeurs dans les quartiers (commissions + formation)" },
      ],
      penetration: [
        { strategy: "Pénétration par le service", desc: "Offrir la livraison gratuite les 3 premiers mois. Coût marginal, mais crée la dépendance et la habitude." },
        { strategy: "Crédit fournisseur", desc: "Proposer 15 jours de crédit aux meilleurs clients dès le 2e mois. Fidélise et rend le concurrent moins attractif." },
        { strategy: "Exclusivités produits", desc: "Négocier l'exclusivité de distribution d'une marque sur votre zone géographique." },
        { strategy: "Groupage de commandes", desc: "Organiser des commandes groupées pour les petits commerçants (économies d'échelle partagées)." },
      ],
      kpis_cles: ["Rotation des stocks (objectif < 30 jours)", "Taux de réachat clients (objectif > 70%)", "Marge nette par produit", "Nombre de clients actifs/mois"],
    },
    service: {
      positioning: "Expert de référence sur une niche spécifique — pas un généraliste",
      pricing: "Forfait journalier ou mensuel fixe. Éviter la facturation à l'heure — vendre la valeur, pas le temps.",
      channels: [
        { n: "Réseau personnel (warm outreach)", d: "Les 3 premiers clients viennent toujours du réseau personnel — ne pas négliger cette étape" },
        { n: "LinkedIn & thought leadership", d: "Publier 3× / semaine sur LinkedIn avec des insights actionnables — crédibilité et inbound" },
        { n: "Recommandations structurées", d: "Demander systématiquement 2 recommandations à chaque client satisfait (système de parrainage)" },
        { n: "Partenariats complémentaires", d: "S'allier avec des acteurs complémentaires (ex: consultant + avocat + expert-comptable) pour des offres complètes" },
        { n: "Conférences & événements", d: "Intervenir gratuitement dans des événements pour asseoir l'expertise et générer des leads" },
      ],
      penetration: [
        { strategy: "Mission pilote à prix réduit", desc: "Proposer la 1ère mission à -30% en échange d'un témoignage vidéo et de 2 références. ROI très fort." },
        { strategy: "Niching radical", desc: "Se spécialiser sur un secteur précis (ex: 'audit RH pour les banques en UEMOA'). Moins de concurrence, prix premium." },
        { strategy: "Produit d'entrée de gamme", desc: "Créer un diagnostic à 50–200€ comme porte d'entrée. Convertit 30–40% en missions plus larges." },
        { strategy: "Modèle retainer", desc: "Proposer un abonnement mensuel (ex: 5 jours/mois). Revenus prévisibles, relation durable." },
      ],
      kpis_cles: ["Taux de conversion proposition → mission", "Durée moyenne de mission", "Taux de recommandation clients", "Revenu mensuel récurrent (RMR)"],
    },
    btp: {
      positioning: "Qualité, respect des délais et des budgets — les 3 points douloureux du BTP local",
      pricing: "Tarif légèrement supérieur au marché, justifié par garanties de délais et traçabilité des coûts",
      channels: [
        { n: "Appels d'offres publics", d: "Veille quotidienne sur DNCMP, journaux officiels — marchés publics accessibles aux PME" },
        { n: "Portfolio de réalisations", d: "Photos HD, vidéos drone, avant/après — le meilleur outil commercial dans le BTP" },
        { n: "Bouche-à-oreille prescripteur", d: "Architectes, bureaux d'études, notaires — prescripteurs clés qui recommandent les bons entrepreneurs" },
        { n: "Réseaux sectoriels", d: "FÉDÉRATION du BTP, chambre de commerce, associations d'entrepreneurs — networking et opportunités" },
        { n: "Showroom ou maison témoin", d: "Construire un bâtiment vitrine à son propre compte — démonstrateur permanent de qualité" },
      ],
      penetration: [
        { strategy: "Niche géographique d'abord", desc: "Dominer un quartier ou une commune avant de s'étendre. Réputation locale = meilleur commercial." },
        { strategy: "Spécialisation technique", desc: "Se spécialiser sur un type de bâtiment (résidentiel haut de gamme, entrepôts, écoles). Différenciation forte." },
        { strategy: "Transparence des coûts", desc: "Proposer un suivi de budget en temps réel aux clients. Rare et rassurant dans le secteur." },
        { strategy: "Consortium de PME", desc: "S'associer à d'autres PME locales pour soumissionner à des marchés trop grands pour chacun seul." },
      ],
      kpis_cles: ["Taux de respect des délais (objectif > 90%)", "Taux de satisfaction client (objectif > 85%)", "Carnet de commandes en mois", "Marge nette par chantier"],
    },
    health: {
      positioning: "Soins de qualité accessibles, personnel agréé, technologies modernes, approche préventive",
      pricing: "Tarification mixte : tarifs sociaux pour les plus modestes + tarifs marchés pour assurés + forfaits entreprises",
      channels: [
        { n: "Partenariats entreprises", d: "Contrats de médecine du travail avec les PME et grandes entreprises de la zone" },
        { n: "Mutuelles de santé", d: "Affiliation aux mutuelles et assurances santé — source de revenus récurrents et prévisibles" },
        { n: "Présence communautaire", d: "Journées de santé gratuites, sensibilisations dans les quartiers — confiance et notoriété" },
        { n: "Référencement médical", d: "Réseau de médecins référents qui orientent leurs patients vers vos spécialités" },
        { n: "Télémédecine", d: "Étendre la portée géographique sans coût d'infrastructure supplémentaire" },
      ],
      penetration: [
        { strategy: "Convention avec les employeurs", desc: "Proposer des forfaits 'médecine du travail' aux entreprises — revenu garanti, flux de patients assuré." },
        { strategy: "Prise en charge totale assurés", desc: "Simplifier au maximum les démarches pour les assurés — avantage concurrentiel fort." },
        { strategy: "Programme santé scolaire", desc: "Partenariats avec les établissements scolaires pour les visites médicales annuelles." },
        { strategy: "Spécialité rare localement", desc: "Se positionner sur une spécialité peu disponible dans la zone — crée un avantage de destination." },
      ],
      kpis_cles: ["Nombre de patients/mois (objectif croissance 10%/mois)", "Taux de retour patients (objectif > 60%)", "Taux de convention employeurs actifs", "Score satisfaction patients"],
    },
  };

  let roadmap, strategy;
  if (isFood) { roadmap = roadmaps.food; strategy = strategies.food; }
  else if (isTech) { roadmap = roadmaps.tech; strategy = strategies.tech; }
  else if (isAgri) { roadmap = roadmaps.agri; strategy = strategies.agri; }
  else if (isTrade) { roadmap = roadmaps.trade; strategy = strategies.trade; }
  else if (isService) { roadmap = roadmaps.service; strategy = strategies.service; }
  else if (isBTP) { roadmap = roadmaps.btp; strategy = strategies.btp; }
  else if (isHealth) { roadmap = roadmaps.health; strategy = strategies.health; }
  else { roadmap = roadmaps.default; strategy = strategies.service; }

  return { roadmap, strategy };
}

// ══════════════════════════════════════════════════════════
// ROADMAP TAB COMPONENT
// ══════════════════════════════════════════════════════════
function RoadmapTab({ data }) {
  const [view, setView] = useState("roadmap");
  const [openPhase, setOpenPhase] = useState(0);
  const { roadmap, strategy } = getRoadmapData(data.type_projet || "", data);
  const Tb = id => ({ fontSize: 11, cursor: "pointer", padding: "6px 13px", borderRadius: 15, border: "1px solid", fontFamily: "inherit", fontWeight: view === id ? 700 : 400, borderColor: view === id ? "#f0a500" : "#252b38", background: view === id ? "rgba(240,165,0,0.1)" : "#111419", color: view === id ? "#f0a500" : "#7a8299" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Header */}
      <div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
          🗺️ Roadmap & Stratégies — <span style={{ color: "#f0a500" }}>{data.type_projet}</span>
        </div>
        <div style={{ fontSize: 11, color: "#7a8299" }}>Plan de lancement et stratégies de pénétration adaptés à votre secteur</div>
      </div>

      {/* Sub-tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <button onClick={() => setView("roadmap")} style={Tb("roadmap")}>📅 Roadmap de lancement</button>
        <button onClick={() => setView("penetration")} style={Tb("penetration")}>🎯 Pénétration du marché</button>
        <button onClick={() => setView("channels")} style={Tb("channels")}>📣 Canaux d'acquisition</button>
        <button onClick={() => setView("kpis")} style={Tb("kpis")}>📊 KPIs à suivre</button>
      </div>

      {/* ── ROADMAP VIEW ── */}
      {view === "roadmap" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Timeline header */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${roadmap.length}, 1fr)`, gap: 4, marginBottom: 14 }}>
            {roadmap.map((p, i) => (
              <div key={i} onClick={() => setOpenPhase(i)} style={{ cursor: "pointer", background: openPhase === i ? p.color + "22" : "#111419", border: `1px solid ${openPhase === i ? p.color : "#252b38"}`, borderRadius: 9, padding: "8px 6px", textAlign: "center", transition: "all 0.2s" }}>
                <div style={{ fontSize: 14, marginBottom: 3 }}>{p.icon}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: openPhase === i ? p.color : "#7a8299" }}>{p.phase}</div>
                <div style={{ fontSize: 8, color: "#555e77", marginTop: 1 }}>{p.duration}</div>
              </div>
            ))}
          </div>

          {/* Connector line */}
          <div style={{ position: "relative", height: 6, background: "#181c24", borderRadius: 3, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${((openPhase + 1) / roadmap.length) * 100}%`, background: `linear-gradient(90deg, #4a9eff, ${roadmap[openPhase]?.color})`, transition: "width 0.4s ease", borderRadius: 3 }} />
          </div>

          {/* Active phase detail */}
          {roadmap[openPhase] && (() => {
            const p = roadmap[openPhase];
            return (
              <div style={{ background: "#111419", border: `1px solid ${p.color}44`, borderRadius: 13, overflow: "hidden" }}>
                <div style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)`, padding: "14px 18px", borderBottom: `1px solid ${p.color}33` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 22 }}>{p.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: p.color }}>{p.phase} — {p.label}</div>
                      <div style={{ fontSize: 11, color: "#7a8299" }}>{p.duration}</div>
                    </div>
                  </div>
                  <div style={{ background: p.color + "15", border: `1px solid ${p.color}33`, borderRadius: 8, padding: "8px 12px", fontSize: 11, color: p.color }}>
                    <strong>🎯 Objectif :</strong> {p.kpi}
                  </div>
                </div>
                <div style={{ padding: "14px 18px" }}>
                  <div style={{ fontSize: 10, color: "#7a8299", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontWeight: 700 }}>Actions clés</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {p.tasks.map((task, j) => (
                      <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: p.color + "22", border: `1px solid ${p.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: p.color, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{j + 1}</div>
                        <div style={{ fontSize: 12, lineHeight: 1.6, paddingTop: 1 }}>{task}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Phase navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            <button onClick={() => setOpenPhase(Math.max(0, openPhase - 1))} disabled={openPhase === 0} style={{ padding: "7px 14px", background: "#111419", border: "1px solid #252b38", borderRadius: 8, color: openPhase === 0 ? "#3d4560" : "#e8eaf0", fontSize: 11, cursor: openPhase === 0 ? "not-allowed" : "pointer", fontFamily: "inherit" }}>← Phase précédente</button>
            <div style={{ fontSize: 11, color: "#7a8299", alignSelf: "center" }}>{openPhase + 1} / {roadmap.length}</div>
            <button onClick={() => setOpenPhase(Math.min(roadmap.length - 1, openPhase + 1))} disabled={openPhase === roadmap.length - 1} style={{ padding: "7px 14px", background: "#111419", border: "1px solid #252b38", borderRadius: 8, color: openPhase === roadmap.length - 1 ? "#3d4560" : "#f0a500", fontSize: 11, cursor: openPhase === roadmap.length - 1 ? "not-allowed" : "pointer", fontFamily: "inherit" }}>Phase suivante →</button>
          </div>
        </div>
      )}

      {/* ── PENETRATION STRATEGIES VIEW ── */}
      {view === "penetration" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {/* Positioning */}
          <div style={{ background: "linear-gradient(135deg, rgba(240,165,0,0.08), rgba(224,92,42,0.04))", border: "1px solid rgba(240,165,0,0.25)", borderRadius: 11, padding: 16 }}>
            <div style={{ fontSize: 10, color: "#f0a500", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>🏷️ Positionnement recommandé</div>
            <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.6 }}>{strategy.positioning}</div>
          </div>

          {/* Pricing */}
          <div style={{ background: "rgba(74,158,255,0.06)", border: "1px solid rgba(74,158,255,0.2)", borderRadius: 11, padding: 14 }}>
            <div style={{ fontSize: 10, color: "#4a9eff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>💰 Stratégie de prix</div>
            <div style={{ fontSize: 12, lineHeight: 1.7 }}>{strategy.pricing}</div>
          </div>

          {/* Penetration tactics */}
          <div style={{ fontSize: 10, color: "#7a8299", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>🚀 Tactiques de pénétration</div>
          {strategy.penetration?.map((tactic, i) => (
            <div key={i} style={{ background: "#111419", border: "1px solid #252b38", borderRadius: 11, padding: 14, display: "flex", gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: `hsl(${220 + i * 30}, 70%, 45%)22`, border: `1px solid hsl(${220 + i * 30}, 70%, 45%)44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>
                {["🎯", "💡", "🔗", "📦"][i] || "✅"}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{tactic.strategy}</div>
                <div style={{ fontSize: 11, color: "#a0a8c0", lineHeight: 1.65 }}>{tactic.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CHANNELS VIEW ── */}
      {view === "channels" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "rgba(46,204,138,0.05)", border: "1px solid rgba(46,204,138,0.2)", borderRadius: 10, padding: "12px 15px", fontSize: 12, lineHeight: 1.7 }}>
            <strong style={{ color: "#2ecc8a" }}>💡 Règle des 3 canaux</strong> — Maîtrisez d'abord 1–2 canaux à la perfection avant d'en ajouter. Un canal performant vaut mieux que 5 médiocres.
          </div>
          {strategy.channels?.map((ch, i) => (
            <div key={i} style={{ background: "#111419", border: "1px solid #252b38", borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>📣 {ch.n}</div>
                <div style={{ fontSize: 9, background: i < 2 ? "rgba(240,165,0,0.12)" : "rgba(74,158,255,0.1)", color: i < 2 ? "#f0a500" : "#4a9eff", padding: "2px 8px", borderRadius: 8, fontWeight: 700 }}>{i < 2 ? "PRIORITAIRE" : "SECONDAIRE"}</div>
              </div>
              <div style={{ fontSize: 11, color: "#a0a8c0", lineHeight: 1.65 }}>{ch.d}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── KPIS VIEW ── */}
      {view === "kpis" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          <div style={{ background: "rgba(74,158,255,0.06)", border: "1px solid rgba(74,158,255,0.2)", borderRadius: 10, padding: "12px 15px", fontSize: 12, lineHeight: 1.7 }}>
            <strong style={{ color: "#4a9eff" }}>📊 Pourquoi mesurer ?</strong> — "Ce qui ne se mesure pas ne se gère pas." Ces KPIs vous permettent de détecter les problèmes tôt et de prendre les bonnes décisions.
          </div>

          {/* Custom KPIs */}
          <div style={{ background: "#111419", border: "1px solid #252b38", borderRadius: 11, overflow: "hidden" }}>
            <div style={{ padding: "10px 15px", background: "#181c24", borderBottom: "1px solid #252b38", fontSize: 11, fontWeight: 700 }}>🎯 KPIs prioritaires — {data.type_projet}</div>
            <div style={{ padding: "12px 15px", display: "flex", flexDirection: "column", gap: 9 }}>
              {strategy.kpis_cles?.map((kpi, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 11px", background: "#181c24", borderRadius: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg,#f0a500,#e05c2a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#000", fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: 12 }}>{kpi}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Universal KPIs */}
          <div style={{ background: "#111419", border: "1px solid #252b38", borderRadius: 11, overflow: "hidden" }}>
            <div style={{ padding: "10px 15px", background: "#181c24", borderBottom: "1px solid #252b38", fontSize: 11, fontWeight: 700 }}>📈 KPIs financiers universels</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead><tr>{["Indicateur", "Formule", "Fréquence"].map(h => <th key={h} style={{ padding: "7px 13px", textAlign: "left", color: "#7a8299", fontSize: 9, textTransform: "uppercase", letterSpacing: 1, background: "#181c24", borderBottom: "1px solid #252b38" }}>{h}</th>)}</tr></thead>
              <tbody>{[
                ["Seuil de rentabilité", "Charges fixes ÷ Marge sur coûts variables", "Mensuel"],
                ["Cash burn rate", "Trésorerie disponible ÷ Dépenses/mois", "Hebdo"],
                ["Taux de marge nette", "(CA - Toutes charges) ÷ CA × 100", "Mensuel"],
                ["Coût d'acquisition client", "Budget marketing ÷ Nb nouveaux clients", "Mensuel"],
                ["Taux de rétention", "Clients actifs ce mois ÷ Clients actifs mois préc.", "Mensuel"],
                ["Délai moyen encaissement", "Créances clients ÷ CA journalier moyen", "Mensuel"],
              ].map(([kpi, f, freq], i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "7px 13px", fontWeight: 600 }}>{kpi}</td>
                  <td style={{ padding: "7px 13px", color: "#7a8299", fontSize: 10 }}>{f}</td>
                  <td style={{ padding: "7px 13px" }}><span style={{ background: "rgba(240,165,0,0.1)", color: "#f0a500", padding: "2px 7px", borderRadius: 6, fontSize: 10 }}>{freq}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>

          {/* Dashboard recommendation */}
          <div style={{ background: "rgba(46,204,138,0.06)", border: "1px solid rgba(46,204,138,0.2)", borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#2ecc8a", marginBottom: 6 }}>🛠️ Comment tracker ces KPIs ?</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 11, lineHeight: 1.6 }}>
              <div>• <strong>Gratuit :</strong> Google Sheets avec tableau de bord hebdomadaire partagé avec votre équipe</div>
              <div>• <strong>Simple :</strong> Wave Accounting (gratuit), Odoo CE, ou même un cahier de caisse structuré</div>
              <div>• <strong>Avancé :</strong> QuickBooks, Sage 50, ou un outil sectoriel adapté à votre activité</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════
function parseAmt(t) {
  if (!t) return null;
  const s = String(t).replace(/\s/g, "").replace(/,/g, ".");
  const m = s.match(/(\d+(?:\.\d+)?)\s*(million|M)/i);
  if (m) return parseFloat(m[1]) * 1e6;
  const n = s.match(/(\d[\d.]*)/);
  return n ? parseFloat(n[1]) : null;
}
function fmt(n, cur = "FCFA") {
  if (n === null || n === undefined || isNaN(n)) return "—";
  const a = Math.abs(n), sg = n < 0 ? "-" : "";
  if (a >= 1e6) return sg + (a / 1e6).toFixed(1) + "M " + cur;
  if (a >= 1000) return sg + Math.round(a).toLocaleString("fr-FR") + " " + cur;
  return sg + Math.round(a) + " " + cur;
}
function calcFin(data) {
  const zd = ZONES[data.zone_geo] || ZONES["Afrique de l'Ouest (UEMOA/CEDEAO)"];
  const cur = zd.currency?.split(" / ")[0] || "FCFA";
  const invest = parseAmt(data.investissement_initial) || 8500000;
  const revM = parseAmt(data.revenus_ventes) || 4690000;
  let charges = parseAmt(data.charges_couts) || 2900000;
  if (charges < revM * 0.25) charges = revM * 0.5;
  const hasLoan = /prêt|emprunt|banque|imf|microfinance|finadev|padme/i.test(data.financement || "");
  const loanAmt = hasLoan ? invest * 0.35 : 0;
  const remb = hasLoan ? loanAmt * 0.016 : 0;
  const cfM = revM - charges - remb;
  const cfA = cfM * 12;
  const roi = invest > 0 ? (cfA / invest) * 100 : 0;
  const payback = cfM > 0 ? invest / cfM : 999;
  const marge = revM > 0 ? (revM - charges) / revM * 100 : 0;
  const years = Array.from({ length: 5 }, (_, i) => {
    const rev = revM * 12 * Math.pow(1.10, i);
    const ch = charges * 12 * Math.pow(1.04, i);
    return { y: i + 1, rev, ch, cf: rev - ch - remb * 12 };
  });
  let cum = -invest;
  const yearsC = years.map(r => { cum += r.cf; return { ...r, cum }; });
  return { invest, revM, charges, remb, cfM, cfA, roi, payback, marge, yearsC, cur, zd };
}

// ══════════════════════════════════════════════════════════
// FINANCIAL ENGINE — SYSCOHADA / IFRS / Normes bancaires
// ══════════════════════════════════════════════════════════
function calcIRR(cf, g = 0.15) {
  let r = g;
  for (let i = 0; i < 1000; i++) {
    let npv = 0, d = 0;
    cf.forEach((v, t) => { const disc = Math.pow(1+r,t); npv += v/disc; if(t>0) d -= t*v/(disc*(1+r)); });
    if (Math.abs(d) < 1e-10) break;
    const nr = r - npv/d;
    if (!isFinite(nr) || Math.abs(nr-r) < 1e-8) return isFinite(nr) ? nr : r;
    r = Math.max(-0.99, Math.min(10, nr));
  }
  return r;
}

function calcFinancials(data) {
  const zd   = ZONES[data.zone_geo] || ZONES["Afrique de l'Ouest (UEMOA/CEDEAO)"];
  const tax  = TAX_RULES[data.zone_geo] || TAX_RULES["Afrique de l'Ouest (UEMOA/CEDEAO)"];
  const cur  = zd.currency?.split(" / ")[0] || "FCFA";
  const { isRate, minTaxRate, vatRate, socialRate, deprecRates, wcr, wacc, loanRate, patente } = tax;

  // ── INPUTS ─────────────────────────────────────────────
  const invest_total = parseAmt(data.investissement_initial) || 8_500_000;
  const revM_ttc     = parseAmt(data.revenus_ventes)         || 4_690_000;
  const chargesM_raw = parseAmt(data.charges_couts)          || 2_900_000;

  // Assujettissement TVA (seuil UEMOA = 50M FCFA/an, France = 36 800€)
  const ca_annual_est = revM_ttc * 12;
  const tva_seuil = cur === "FCFA" ? 50_000_000 : cur === "EUR" ? 36_800 : cur === "USD" ? 200_000 : 50_000_000;
  const is_vat = ca_annual_est >= tva_seuil;
  const coeff_ht = is_vat ? 1/(1+vatRate) : 1;
  const revM_ht = revM_ttc * coeff_ht;
  const chargesM_ht = chargesM_raw * coeff_ht; // TVA déductible sur achats

  // ── STRUCTURE D'INVESTISSEMENT ─────────────────────────
  const t_low = (data.type_projet||"").toLowerCase();
  const isServ = /service|consult|tech|app|saas|digital/i.test(t_low);
  const isFood = /restaurant|aliment|traiteur/i.test(t_low);
  const isTrad = /commerce|boutique|import|négoce/i.test(t_low);

  const immo_pct = isServ ? 0.50 : 0.65;
  const immos_brutes     = invest_total * immo_pct;
  const frais_etab       = invest_total * 0.03;
  const bfr_init         = invest_total * 0.17;
  const treso_init       = invest_total - immos_brutes - frais_etab - bfr_init;

  // ── CHARGES DECOMPOSÉES ─────────────────────────────────
  // Décomposition sectorielle typique du total charges mensuel (HT)
  const cogs_pct = isFood ? 0.55 : isTrad ? 0.65 : isServ ? 0.15 : 0.45;
  const sal_pct  = isServ ? 0.50 : isFood ? 0.22 : 0.25;
  // Nota: charges patronales NON incluses dans chargesM → ajout sur P&L
  const cogsM        = chargesM_ht * cogs_pct;
  const salairesM_br = chargesM_ht * sal_pct;       // Salaires BRUTS inclus dans chargesM
  const autresM      = chargesM_ht * (1 - cogs_pct - sal_pct); // Loyer, énergie, etc.
  const pat_add_M    = salairesM_br * socialRate;    // Charges patronales EN PLUS (non incluses)

  // ── FINANCEMENT ─────────────────────────────────────────
  const has_loan = /prêt|emprunt|banque|imf|microfinance|finadev|padme|crédit/i.test(data.financement||"");
  const loan_amt = has_loan ? invest_total * 0.40 : 0;
  const capital_propre = invest_total - loan_amt;
  const rate_m = loanRate / 12;
  const n_m    = 60; // 5 ans × 12 mois
  const mensualite = loan_amt > 0 ? loan_amt * rate_m / (1 - Math.pow(1+rate_m, -n_m)) : 0;

  // Tableau d'amortissement de l'emprunt (5 ans)
  const loan_table = [];
  let encours = loan_amt;
  for (let y = 1; y <= 5; y++) {
    let int_y = 0, cap_y = 0;
    for (let m = 0; m < 12; m++) {
      if (encours <= 0.01) break;
      const int_m = encours * rate_m;
      const cap_m = Math.min(mensualite - int_m, encours);
      int_y += int_m; cap_y += cap_m; encours -= cap_m;
    }
    loan_table.push({ y, int: int_y, cap: cap_y, balance: Math.max(0, encours), annuite: int_y + cap_y });
  }

  // DAP (Dotations Amortissements Provisions) — linéaire
  const dap_annual = immos_brutes * deprecRates.equipement + frais_etab * 0.20;

  // BFR normatif (en jours de CA HT)
  const bfr_jours = Math.max(0, wcr.stockDays + wcr.receivableDays - wcr.payableDays);
  const bfr_ratio = bfr_jours / 365;

  // ── MODÈLE 5 ANS ────────────────────────────────────────
  let treso = treso_init;
  let cumul_dap = 0, cumul_reserves = 0, cumul_rna = 0;
  const income_stmt = [], cashflow_stmt = [], balance_sheet = [];

  // Bilan Année 0
  balance_sheet.push({ y: 0,
    actif:  { immos_brutes, amort: 0, immos_nettes: immos_brutes, frais_etab, stocks: bfr_init*0.5, creances: bfr_init*0.5, treso: treso_init, total: invest_total },
    passif: { capital: capital_propre, reserves: 0, rna: 0, resultat: 0, cp: capital_propre, dettes_lt: loan_amt, dettes_frs: 0, dettes_fisc: 0, total: invest_total },
  });

  for (let i = 0; i < 5; i++) {
    const y     = i + 1;
    const gR    = Math.pow(1.10, i); // +10%/an revenus
    const gC    = Math.pow(1.04, i); // +4%/an coûts

    // ── COMPTE DE RÉSULTAT ────────────────────────────────
    const ca_ht   = revM_ht * 12 * gR;
    const ca_ttc  = revM_ttc * 12 * gR;
    const cogs    = cogsM * 12 * gC;
    const mb      = ca_ht - cogs;

    const sal_br  = salairesM_br * 12 * gC;    // Salaires bruts
    const ch_pat  = sal_br * socialRate;        // Charges patronales (ajout)
    const autres  = autresM * 12 * gC;         // Loyer + énergie + autres
    const imp_tx  = ca_ht * patente;           // Patente, taxes locales

    const ebitda  = mb - sal_br - ch_pat - autres - imp_tx;
    const dap     = dap_annual;
    cumul_dap += dap;
    const ebit    = ebitda - dap;

    const lt      = loan_table[i] || { int:0, cap:0, balance:0, annuite:0 };
    const ch_fin  = lt.int;
    const rcai    = ebit - ch_fin;

    // IS avec minimum fiscal
    const is_th   = Math.max(0, rcai) * isRate;
    const is_min  = minTaxRate > 0 ? ca_ht * minTaxRate : 0;
    const is      = Math.max(is_th, is_min);
    const rnet    = rcai - is;

    // Affectation résultat
    const res_leg = rnet > 0 ? rnet * 0.10 : 0; // Réserve légale 10%
    const divid   = rnet > 0 && y >= 3 ? (rnet - res_leg) * 0.15 : 0;
    cumul_reserves += Math.max(0, res_leg);
    cumul_rna += rnet - Math.max(0, res_leg) - divid;

    income_stmt.push({
      y, ca_ht, ca_ttc, cogs, mb, tx_mb: mb/ca_ht,
      sal_br, ch_pat, autres, imp_tx, ebitda, dap, ebit,
      ch_fin, rcai, is, rnet, res_leg, divid,
      marge_ebitda: ebitda/ca_ht, marge_nette: rnet/ca_ht, marge_ebit: ebit/ca_ht,
    });

    // ── FLUX DE TRÉSORERIE ────────────────────────────────
    const caf       = rnet + dap;
    const bfr_now   = Math.max(0, ca_ht * bfr_ratio);
    const bfr_prev  = i === 0 ? bfr_init : Math.max(0, income_stmt[i-1].ca_ht * bfr_ratio);
    const var_bfr   = bfr_now - bfr_prev;
    const flux_exp  = caf - var_bfr;
    const flux_inv  = 0; // pas de capex supplémentaire
    const flux_fin  = -lt.cap - divid;
    const var_treso = flux_exp + flux_inv + flux_fin;
    treso += var_treso;

    cashflow_stmt.push({
      y, rnet, dap, caf, var_bfr, flux_exp, flux_inv,
      remb: lt.cap, divid, flux_fin, var_treso, treso,
      dscr: lt.annuite > 0 ? caf / lt.annuite : null,
    });

    // ── BILAN ─────────────────────────────────────────────
    const immos_nettes = Math.max(0, immos_brutes - cumul_dap);
    const fe_net       = Math.max(0, frais_etab - dap_annual*0.2*y);
    const stocks_n     = bfr_now * (wcr.stockDays / Math.max(1,bfr_jours));
    const creances_n   = bfr_now * (wcr.receivableDays / Math.max(1,bfr_jours));
    const treso_bs     = Math.max(0, treso);
    const total_actif  = immos_nettes + fe_net + stocks_n + creances_n + treso_bs;

    const cp          = capital_propre + cumul_reserves + cumul_rna;
    const dettes_lt   = lt.balance;
    const dettes_frs  = ca_ht * (wcr.payableDays/365);
    const dettes_fisc = Math.max(0, is);
    const total_passif = cp + dettes_lt + dettes_frs + dettes_fisc;

    balance_sheet.push({ y,
      actif:  { immos_brutes, amort: cumul_dap, immos_nettes, frais_etab: fe_net, stocks: stocks_n, creances: creances_n, treso: treso_bs, total: total_actif },
      passif: { capital: capital_propre, reserves: cumul_reserves, rna: cumul_rna - rnet - divid, resultat: rnet, cp, dettes_lt, dettes_frs, dettes_fisc, total: total_passif },
    });
  }

  // ── DCF / VAN / TRI ────────────────────────────────────
  const cafs    = cashflow_stmt.map(r => r.caf);
  const dcf_val = cafs.map((c,i) => c / Math.pow(1+wacc, i+1));
  const g_tv    = 0.03;
  const tv      = cafs[4] * (1+g_tv) / (wacc - g_tv);
  const tv_pv   = tv / Math.pow(1+wacc, 5);
  const sum_dcf = dcf_val.reduce((a,b) => a+b, 0);
  const van     = sum_dcf + tv_pv - invest_total;
  const van_pct = van / invest_total * 100;
  const tri     = calcIRR([-invest_total, ...cafs]);
  let payback_d = null;
  let cd = -invest_total;
  dcf_val.forEach((v,i) => { cd += v; if (cd >= 0 && !payback_d) payback_d = i+1; });

  // ── RATIOS BANCAIRES ───────────────────────────────────
  const ratios = income_stmt.map((pl, i) => {
    const cf = cashflow_stmt[i];
    const bs = balance_sheet[i+1];
    const lt = loan_table[i] || { annuite:0 };
    return {
      y: pl.y,
      dscr: lt.annuite > 0 ? cf.caf / lt.annuite : null,
      levier: bs.passif.cp > 0 ? bs.passif.dettes_lt / bs.passif.cp : 0,
      autonomie: bs.passif.total > 0 ? bs.passif.cp / bs.passif.total : 0,
      couv_int: pl.ch_fin > 0 ? pl.ebit / pl.ch_fin : null,
      roe: bs.passif.cp > 0 ? pl.rnet / bs.passif.cp : 0,
      marge_nette: pl.marge_nette,
      marge_ebitda: pl.marge_ebitda,
    };
  });

  // ── SEUIL DE RENTABILITÉ ───────────────────────────────
  const pl1       = income_stmt[0];
  const cf_fixes  = (pl1.sal_br + pl1.ch_pat + pl1.autres + pl1.dap) / 12;
  const tx_mv     = pl1.ca_ht > 0 ? 1 - pl1.cogs / pl1.ca_ht : 0.5;
  const seuil_M   = tx_mv > 0 ? cf_fixes / tx_mv : 0;
  const seuil_pct = revM_ht > 0 ? seuil_M / revM_ht * 100 : null;

  return {
    income_stmt, cashflow_stmt, balance_sheet, loan_table, ratios, dcf_val,
    van, van_pct, tri, wacc, tv, tv_pv, payback_d,
    seuil_M, seuil_pct, tx_mv,
    invest_total, loan_amt, capital_propre, mensualite, loanRate,
    is_vat, vatRate, isRate, minTaxRate, socialRate, dap_annual,
    immos_brutes, bfr_init, treso_init, bfr_jours, frais_etab,
    cur, tax, cafs,
  };
}

function fmtTxt(text) {
  return text.split("\n").map((line, i, arr) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return <span key={i}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}{i < arr.length - 1 && <br />}</span>;
  });
}

// ══════════════════════════════════════════════════════════
// FILE TO BASE64
// ══════════════════════════════════════════════════════════
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function fileToText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file, "utf-8");
  });
}

// ══════════════════════════════════════════════════════════
// DOCUMENT UPLOAD
// ══════════════════════════════════════════════════════════
function DocUpload({ onExtracted, existingDoc }) {
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const ACCEPTED = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "image/png", "image/jpeg", "image/jpg", "image/webp"];
  const ACCEPT_STR = ".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.webp";

  async function processFile(file) {
    if (!ACCEPTED.includes(file.type) && !file.name.match(/\.(pdf|docx?|txt|png|jpe?g|webp)$/i)) { setError("Format non supporté. Acceptés : PDF, Word, TXT, PNG, JPG"); return; }
    setError(""); setProcessing(true); setProgress("Lecture du fichier...");
    try {
      const isImage = file.type.startsWith("image/");
      const isPdf = file.type === "application/pdf";
      const isText = file.type === "text/plain";
      let messages;
      if (isText) {
        const text = await fileToText(file);
        setProgress("Analyse par l'IA...");
        messages = [{ role: "user", content: `Plan d'affaire:\n\n${text.substring(0, 8000)}\n\nExtrait les infos clés en JSON.` }];
      } else if (isImage) {
        setProgress("Analyse de l'image...");
        const b64 = await fileToBase64(file);
        messages = [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: file.type, data: b64 } }, { type: "text", text: "Extrait les informations de ce plan d'affaire en JSON." }] }];
      } else {
        setProgress("Extraction du document...");
        const b64 = await fileToBase64(file);
        const mediaType = isPdf ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        messages = [{ role: "user", content: [{ type: "document", source: { type: "base64", media_type: mediaType, data: b64 } }, { type: "text", text: "Extrait les informations de ce plan d'affaire en JSON." }] }];
      }
      setProgress("L'IA analyse votre document...");
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 2000,
          system: `Expert business plans. Retourne UNIQUEMENT un JSON valide avec ces champs (string, null si absent): type_projet, presentation, zone_geo, marche_clients, investissement_initial, revenus_ventes, charges_couts, financement, risques, resume_document, points_forts, points_amelioration, donnees_financieres_brutes. Sans markdown ni backticks.`,
          messages
        })
      });
      const aiData = await resp.json();
      const rawText = aiData.content?.[0]?.text || "{}";
      let extracted = {};
      try { extracted = JSON.parse(rawText.replace(/```json|```/g, "").trim()); }
      catch { const m = rawText.match(/\{[\s\S]*\}/); if (m) { try { extracted = JSON.parse(m[0]); } catch { extracted = { resume_document: rawText.substring(0, 500) }; } } }
      extracted._fileName = file.name;
      extracted._fileSize = (file.size / 1024).toFixed(0) + " KB";
      extracted._fileType = file.type || "inconnu";
      setProgress(""); setProcessing(false); onExtracted(extracted);
    } catch (err) { setProcessing(false); setProgress(""); setError("Erreur : " + (err.message || "Vérifiez votre connexion")); }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) processFile(f); }} onClick={() => !processing && inputRef.current?.click()}
        style={{ border: `2px dashed ${dragging ? "#f0a500" : existingDoc ? "#2ecc8a" : "#2a3044"}`, borderRadius: 14, padding: "28px 20px", textAlign: "center", cursor: processing ? "not-allowed" : "pointer", background: dragging ? "rgba(240,165,0,0.05)" : existingDoc ? "rgba(46,204,138,0.04)" : "rgba(255,255,255,0.02)", transition: "all 0.2s" }}>
        <input ref={inputRef} type="file" accept={ACCEPT_STR} onChange={e => { const f = e.target.files[0]; if (f) processFile(f); }} style={{ display: "none" }} />
        {processing ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid #f0a500", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
            <div style={{ fontSize: 13, color: "#f0a500", fontWeight: 600 }}>{progress}</div>
          </div>
        ) : existingDoc ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 32 }}>✅</div>
            <div style={{ fontSize: 13, color: "#2ecc8a", fontWeight: 700 }}>{existingDoc._fileName}</div>
            <div style={{ fontSize: 11, color: "#7a8299" }}>{existingDoc._fileSize} · Cliquez pour remplacer</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 36 }}>📤</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Glissez votre plan d'affaires ici</div>
            <div style={{ fontSize: 12, color: "#7a8299" }}>ou cliquez pour parcourir</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
              {["PDF", "Word (.docx)", "TXT", "Image (PNG/JPG)"].map(f => <span key={f} style={{ fontSize: 10, background: "#181c24", border: "1px solid #252b38", borderRadius: 8, padding: "3px 9px", color: "#7a8299" }}>{f}</span>)}
            </div>
          </div>
        )}
      </div>
      {error && <div style={{ background: "rgba(224,92,42,0.1)", border: "1px solid rgba(224,92,42,0.3)", borderRadius: 9, padding: "10px 14px", fontSize: 12, color: "#e05c2a" }}>⚠️ {error}</div>}
      {existingDoc && !processing && (
        <div style={{ background: "#111419", border: "1px solid rgba(46,204,138,0.25)", borderRadius: 12, padding: 15, display: "flex", flexDirection: "column", gap: 9 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#2ecc8a" }}>📊 Informations extraites</div>
          {existingDoc.resume_document && <div style={{ background: "rgba(240,165,0,0.06)", border: "1px solid rgba(240,165,0,0.15)", borderRadius: 9, padding: "10px 13px", fontSize: 11, lineHeight: 1.7 }}><strong style={{ color: "#f0a500", display: "block", marginBottom: 4 }}>📋 Résumé</strong>{existingDoc.resume_document}</div>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[{ l: "Secteur", v: existingDoc.type_projet }, { l: "Zone géo.", v: existingDoc.zone_geo }, { l: "Investissement", v: existingDoc.investissement_initial?.substring(0, 80) }, { l: "Revenus prévus", v: existingDoc.revenus_ventes?.substring(0, 80) }].filter(k => k.v).map((k, i) => (
              <div key={i} style={{ background: "#181c24", borderRadius: 8, padding: "8px 11px" }}>
                <div style={{ fontSize: 9, color: "#7a8299", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{k.l}</div>
                <div style={{ fontSize: 11 }}>{k.v}</div>
              </div>
            ))}
          </div>
          {existingDoc.points_forts && <div style={{ background: "rgba(46,204,138,0.05)", borderRadius: 8, padding: "9px 12px" }}><div style={{ fontSize: 10, color: "#2ecc8a", fontWeight: 700, marginBottom: 3 }}>✅ Points forts</div><div style={{ fontSize: 11, color: "#a8e6c8", lineHeight: 1.6 }}>{existingDoc.points_forts}</div></div>}
          {existingDoc.points_amelioration && <div style={{ background: "rgba(240,165,0,0.05)", borderRadius: 8, padding: "9px 12px" }}><div style={{ fontSize: 10, color: "#f0a500", fontWeight: 700, marginBottom: 3 }}>💡 À améliorer</div><div style={{ fontSize: 11, color: "#f5d78a", lineHeight: 1.6 }}>{existingDoc.points_amelioration}</div></div>}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// FINANCING TAB
// ══════════════════════════════════════════════════════════
function FinancingTab({ data }) {
  const [sub, setSub] = useState("overview");
  const { invest, cur, zd } = calcFin(data);
  const apport = parseAmt(data.financement) || invest * 0.3;
  const needed = Math.max(0, invest - Math.min(apport, invest));
  const Tb = id => ({ fontSize: 11, cursor: "pointer", padding: "6px 12px", borderRadius: 15, border: "1px solid", fontFamily: "inherit", fontWeight: sub === id ? 700 : 400, borderColor: sub === id ? "#f0a500" : "#252b38", background: sub === id ? "rgba(240,165,0,0.1)" : "#111419", color: sub === id ? "#f0a500" : "#7a8299" });
  const sources = [
    { t: "Microfinance / IMF", icon: "🤝", rate: zd.rateIMF, pros: ["Sans garantie lourde", "Décision rapide 1–2 sem.", "Accompagnement inclus"], cons: ["Taux élevés", "Montants limités", "Remb. mensuel"], ex: zd.imf?.slice(0, 3).map(i => i.n).join(", "), score: invest < 15e6 ? 3 : 2 },
    { t: "Prêt Bancaire", icon: "🏦", rate: zd.rateBank, pros: ["Grands montants", "Longue durée", "Crédibilité"], cons: ["Garanties exigées", "Délai 1–3 mois", "Apport 20–30%"], ex: zd.banks?.slice(0, 3).map(i => i.n).join(", "), score: invest > 5e6 ? 3 : 2 },
    { t: "Fonds & Programmes 2025", icon: "🏛️", rate: "0–8% subventionné", pros: ["Taux avantageux", "Parfois non remboursable", "Accompagnement"], cons: ["Critères stricts", "Délais longs", "Dossier complexe"], ex: zd.funds?.slice(0, 2).map(i => i.n).join(", "), score: 2 },
    { t: "Investisseurs / Equity", icon: "💼", rate: "Equity 20–40%", pros: ["Pas de remboursement", "Réseau & expertise", "Croissance rapide"], cons: ["Cession de parts", "Fort potentiel requis", "Due diligence"], ex: zd.investors?.slice(0, 2).map(i => i.n).join(", "), score: 1 },
  ];
  const sc = { 3: ["🟢", "Recommandé", "#2ecc8a"], 2: ["🟡", "Possible", "#f0a500"], 1: ["🔴", "Difficile", "#e05c2a"] };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700 }}>💰 Guide Financement — <span style={{ color: "#f0a500" }}>{data.zone_geo}</span> <span style={{ fontSize: 9, background: "rgba(46,204,138,0.12)", color: "#2ecc8a", padding: "2px 7px", borderRadius: 8, fontFamily: "sans-serif", fontWeight: 700 }}>2025</span></div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {[["overview","📊 Vue d'ensemble"],["sources","🏦 Sources"],["pitch","🎯 Approche"],["programs","🏛️ Programmes"]].map(([id,l]) => <button key={id} onClick={() => setSub(id)} style={Tb(id)}>{l}</button>)}
      </div>
      {sub === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[{ l: "Capital requis", v: fmt(invest, cur), c: "#f0a500" }, { l: "Apport personnel", v: fmt(Math.min(apport, invest), cur), c: apport/invest >= 0.2 ? "#2ecc8a" : "#e05c2a" }, { l: "À lever", v: fmt(needed, cur), c: "#4a9eff" }].map((k, i) => (
              <div key={i} style={{ background: "#111419", border: "1px solid #252b38", borderRadius: 10, padding: "12px 11px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#f0a500,#e05c2a)" }} />
                <div style={{ fontSize: 9, color: "#7a8299", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{k.l}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: k.c }}>{k.v}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(74,158,255,0.06)", border: "1px solid rgba(74,158,255,0.18)", borderRadius: 9, padding: 13, fontSize: 11, lineHeight: 1.7 }}><strong style={{ color: "#4a9eff" }}>💡 Actualité 2025</strong><br />{zd.tips}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[{ l: "🏦 Banques", items: zd.banks?.slice(0, 4) }, { l: "🤝 Microfinances", items: zd.imf?.slice(0, 4) }].map((g, i) => (
              <div key={i} style={{ background: "#111419", border: "1px solid #252b38", borderRadius: 9, padding: 12 }}>
                <div style={{ fontSize: 10, color: "#7a8299", marginBottom: 7, fontWeight: 700 }}>{g.l}</div>
                {g.items?.map((item, j) => <div key={j} style={{ fontSize: 10, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}><div style={{ color: "#e8eaf0", fontWeight: 600 }}>{item.n}</div><div style={{ color: "#555e77", fontSize: 9, marginTop: 1 }}>{item.d}</div></div>)}
              </div>
            ))}
          </div>
        </div>
      )}
      {sub === "sources" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {sources.map((s, i) => {
            const [icon, label, color] = sc[s.score];
            return (
              <div key={i} style={{ background: "#111419", border: "1px solid #252b38", borderRadius: 10, padding: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 12 }}>{s.icon} {s.t}</div>
                  <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "#7a8299" }}>Taux : <strong style={{ color: "#f0a500" }}>{s.rate}</strong></span>
                    <span style={{ padding: "2px 8px", borderRadius: 9, fontSize: 10, fontWeight: 700, background: color + "22", color }}>{icon} {label}</span>
                  </div>
                </div>
                <div style={{ fontSize: 10, color: "#7a8299", marginBottom: 8 }}>Exemples : <span style={{ color: "#e8eaf0" }}>{s.ex}</span></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                  {[["✅ Avantages", s.pros, "#2ecc8a", "rgba(46,204,138,0.05)"], ["⚠️ Attention", s.cons, "#e05c2a", "rgba(224,92,42,0.05)"]].map(([lbl, items, c, bg], j) => (
                    <div key={j} style={{ background: bg, borderRadius: 7, padding: 9 }}>
                      <div style={{ fontSize: 9, color: c, marginBottom: 4, fontWeight: 700 }}>{lbl}</div>
                      {items.map((p, k) => <div key={k} style={{ fontSize: 10, padding: "2px 0" }}>• {p}</div>)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {sub === "pitch" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[{n:1,t:"Elevator Pitch (2 min)",d:"Problème résolu ? Pour qui ? Comment ? Pourquoi vous ?"},{n:2,t:"Dossier complet",d:"Business plan, projections 3 ans, CV fondateurs, étude de marché."},{n:3,t:"Commencer par les IMF",d:`PADME/FINADEV pour < 10M ${cur} — décision en 1–2 semaines.`},{n:4,t:"Garantie FAGACE",d:"Garantie 50% du prêt : réduit exigences et taux bancaires."},{n:5,t:"Pitch Deck 10 slides",d:"Problème → Solution → Marché → BM → Traction → Équipe → Finances → Demande."},{n:6,t:"Multi-soumission",d:"Soumettez simultanément à 3–4 sources (IMF + banque + fonds public)."}].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, background: "#111419", border: "1px solid #252b38", borderRadius: 9, padding: 12 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#f0a500,#e05c2a)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{s.n}</div>
              <div><div style={{ fontWeight: 600, fontSize: 11, marginBottom: 2 }}>{s.t}</div><div style={{ fontSize: 10, color: "#a0a8c0", lineHeight: 1.6 }}>{s.d}</div></div>
            </div>
          ))}
        </div>
      )}
      {sub === "programs" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[{ l: "🏛️ Fonds & Programmes 2025", items: zd.funds }, { l: "🌐 Programmes internationaux", items: zd.programs }, { l: "💼 Investisseurs actifs 2025", items: zd.investors }].map((g, i) => (
            <div key={i} style={{ background: "#111419", border: "1px solid #252b38", borderRadius: 9, padding: 13 }}>
              <div style={{ fontWeight: 700, fontSize: 11, marginBottom: 9 }}>{g.l}</div>
              {g.items?.map((item, j) => <div key={j} style={{ padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}><div style={{ fontSize: 11, fontWeight: 600 }}>▶ {item.n}</div><div style={{ fontSize: 10, color: "#7a8299", marginTop: 1 }}>{item.d}</div></div>)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// ÉTATS FINANCIERS — Compte de résultat / Bilan / Flux / DCF
// ══════════════════════════════════════════════════════════
function FinancialStatementsTab({ data }) {
  const [sub, setSub] = useState("cr");
  const fin = calcFinancials(data);
  const { income_stmt:IS, cashflow_stmt:CF, balance_sheet:BS, loan_table:LT, ratios:RA,
    van, van_pct, tri, wacc, dcf_val, tv, tv_pv, payback_d,
    seuil_M, seuil_pct, tx_mv,
    invest_total, loan_amt, capital_propre, mensualite, loanRate,
    is_vat, vatRate, isRate, minTaxRate, socialRate, dap_annual,
    immos_brutes, bfr_init, treso_init, bfr_jours, frais_etab, cur, tax } = fin;

  const pct = v => (v!==null&&v!==undefined&&isFinite(v)) ? (v*100).toFixed(1)+"%" : "—";
  const fmtI = (v,c=cur) => fmt(v,c);
  const Stb = id => ({ fontSize:10, cursor:"pointer", padding:"5px 12px", borderRadius:12, border:"1px solid", fontFamily:"inherit", fontWeight:sub===id?700:400, borderColor:sub===id?"#f0a500":"#252b38", background:sub===id?"rgba(240,165,0,0.1)":"#111419", color:sub===id?"#f0a500":"#7a8299", whiteSpace:"nowrap" });

  // Table style helpers
  const TH  = { padding:"6px 9px", fontSize:8, textTransform:"uppercase", letterSpacing:1, color:"#7a8299", background:"#181c24", borderBottom:"1px solid #252b38", textAlign:"right", whiteSpace:"nowrap" };
  const THL = { ...TH, textAlign:"left" };
  const row_s = (hilite,accent,neg,muted) => ({ padding:"5px 9px", fontSize:10, textAlign:"right", whiteSpace:"nowrap", fontWeight:hilite?700:400, color:accent?"#f0a500":hilite?"#e8eaf0":neg?"#e05c2a":muted?"#555e77":"#a0a8c0" });
  const row_sl = (hilite,accent,muted) => ({ padding:"5px 9px", fontSize:10, color:accent?"#f0a500":hilite?"#e8eaf0":muted?"#555e77":"#7a8299", fontWeight:hilite||accent?700:400, whiteSpace:"nowrap" });
  const GR = (v,thresh=0,inv=false) => {
    const ok = inv ? v < thresh : v > thresh;
    return { color: ok ? "#2ecc8a" : v===0||v===null?"#7a8299" : "#e05c2a" };
  };

  const Badge = ({v, label, target, unit="%", invert=false}) => {
    const num = typeof v === "number" ? v : null;
    const ok = num !== null ? (invert ? num < target : num >= target) : null;
    return (
      <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:9, padding:"10px 13px", minWidth:110 }}>
        <div style={{ fontSize:8, color:"#7a8299", textTransform:"uppercase", letterSpacing:1, marginBottom:5 }}>{label}</div>
        <div style={{ fontFamily:"Georgia, serif", fontSize:22, fontWeight:700, color: num===null?"#7a8299":ok?"#2ecc8a":"#e05c2a" }}>
          {num===null ? "—" : unit==="%"? pct(num) : unit==="x" ? num.toFixed(1)+"×" : fmtI(num)}
        </div>
        {target!==undefined && <div style={{ fontSize:8, color:"#555e77", marginTop:3 }}>Cible : {unit==="%"?pct(target):unit==="x"?target+"×":fmtI(target)}</div>}
        {ok!==null && <div style={{ fontSize:8, color:ok?"#2ecc8a":"#e05c2a", marginTop:2 }}>{ok?"✅ Conforme":"⚠️ Attention"}</div>}
      </div>
    );
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

      {/* Fiscal params banner */}
      <div style={{ background:"rgba(74,158,255,0.06)", border:"1px solid rgba(74,158,255,0.18)", borderRadius:11, padding:"11px 14px" }}>
        <div style={{ fontSize:10, fontWeight:700, color:"#4a9eff", marginBottom:7 }}>⚖️ Règles fiscales appliquées — {tax.accounting || "SYSCOHADA"} — {data.zone_geo}</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:6 }}>
          {[
            ["IS (Impôt Sociétés)", `${(isRate*100).toFixed(0)}%`],
            ["Min. fiscal", minTaxRate>0?`${(minTaxRate*100).toFixed(1)}% CA HT`:"—"],
            ["TVA", is_vat?`${(vatRate*100).toFixed(0)}% (assujetti)`:"Non assujetti"],
            ["Ch. patronales", `${(socialRate*100).toFixed(1)}% salaires`],
            ["Taux actualisation", `${(wacc*100).toFixed(0)}% (WACC)`],
            ["Norme comptable", tax.accounting||"SYSCOHADA"],
          ].map(([l,v]) => (
            <span key={l} style={{ background:"#111419", border:"1px solid #252b38", borderRadius:7, padding:"3px 9px", fontSize:9 }}>
              <span style={{ color:"#555e77" }}>{l}: </span><strong style={{ color:"#4a9eff" }}>{v}</strong>
            </span>
          ))}
        </div>
        <div style={{ fontSize:9, color:"#3d4560", lineHeight:1.5 }}>{tax.notes}</div>
      </div>

      {/* Sub-tabs */}
      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
        {[["cr","📊 Cpte de résultat"],["cf","💧 Flux trésorerie"],["bs","⚖️ Bilan"],["plan","🏗️ Plan financement"],["dcf","📈 DCF & VAN"],["ratios","🏦 Ratios"],["loan","💸 Emprunt"]].map(([id,l]) => (
          <button key={id} onClick={()=>setSub(id)} style={Stb(id)}>{l}</button>
        ))}
      </div>

      {/* ── COMPTE DE RÉSULTAT ── */}
      {sub==="cr" && (
        <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:11, overflow:"hidden" }}>
          <div style={{ padding:"9px 14px", background:"#181c24", borderBottom:"1px solid #252b38", fontSize:11, fontWeight:700 }}>
            📊 Compte de résultat prévisionnel — {tax.accounting||"SYSCOHADA"} — {cur}
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr>
                  <th style={{...THL, minWidth:210}}>Postes</th>
                  {IS.map(p => <th key={p.y} style={TH}>An {p.y}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  { l:"Chiffre d'affaires HT",       k:"ca_ht",       hi:1 },
                  { l:`  CA TTC (TVA ${is_vat?(vatRate*100).toFixed(0)+"%" :"N/A"})`, k:"ca_ttc", mu:1 },
                  { l:"(-) Achats consommés (COGS)",  k:"cogs",        ng:1 },
                  { l:"= MARGE BRUTE",                k:"mb",          hi:1, ac:1 },
                  { l:"  Taux de marge brute",        k:"tx_mb",       pct:1, mu:1 },
                  { l:"(-) Charges de personnel brut",k:"sal_br",      ng:1 },
                  { l:"(-) Cotisations patronales",   k:"ch_pat",      ng:1 },
                  { l:"(-) Autres charges d'exploit.",k:"autres",      ng:1 },
                  { l:"(-) Impôts & taxes (patente)", k:"imp_tx",      ng:1 },
                  { l:"= EBE / EBITDA",               k:"ebitda",      hi:1 },
                  { l:"  Marge EBITDA",               k:"marge_ebitda",pct:1, mu:1 },
                  { l:"(-) DAP (Amortissements)",     k:"dap",         ng:1, mu:1 },
                  { l:"= Résultat d'exploitation (EBIT)",k:"ebit",     hi:1 },
                  { l:"  Marge EBIT",                 k:"marge_ebit",  pct:1, mu:1 },
                  { l:"(-) Charges financières",      k:"ch_fin",      ng:1 },
                  { l:"= RCAI (avant IS)",            k:"rcai",        hi:1 },
                  { l:`(-) IS ${(isRate*100).toFixed(0)}%${minTaxRate>0?" + min.forf.":""}`, k:"is", ng:1 },
                  { l:"= RÉSULTAT NET",               k:"rnet",        hi:1, ac:2 },
                  { l:"  Marge nette",                k:"marge_nette", pct:1, mu:1 },
                  { l:"  Réserve légale (10%)",       k:"res_leg",     mu:1 },
                  { l:"  Dividendes distribués",      k:"divid",       mu:1 },
                ].map((row,ri) => (
                  <tr key={ri} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)", background:row.hi?"rgba(240,165,0,0.03)":"transparent" }}>
                    <td style={row_sl(row.hi,row.ac,row.mu)}>{row.l}</td>
                    {IS.map(p => {
                      const v = p[row.k];
                      const c = row.ac===2?(v>=0?"#2ecc8a":"#e05c2a"):row.ac?"#f0a500":row.hi?"#e8eaf0":row.pct?"#4a9eff":row.ng?"#e05c2a":row.mu?"#555e77":"#a0a8c0";
                      return <td key={p.y} style={{...row_s(row.hi,row.ac,row.ng,row.mu), color:c}}>{row.pct?pct(v):fmtI(v)}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding:"10px 14px", background:"rgba(240,165,0,0.03)", borderTop:"1px solid #252b38", fontSize:10, color:"#7a8299", lineHeight:1.6 }}>
            💡 <strong style={{color:"#f0a500"}}>Note :</strong> DAP = {fmtI(dap_annual)}/an (amort. linéaire équipements). Charges patronales ({(socialRate*100).toFixed(1)}% salaires) ajoutées. IS min. : {minTaxRate>0?(minTaxRate*100).toFixed(1)+"% CA HT":"N/A"}.
          </div>
        </div>
      )}

      {/* ── FLUX DE TRÉSORERIE ── */}
      {sub==="cf" && (
        <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:11, overflow:"hidden" }}>
          <div style={{ padding:"9px 14px", background:"#181c24", borderBottom:"1px solid #252b38", fontSize:11, fontWeight:700 }}>
            💧 Tableau des flux de trésorerie — {cur}
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr>
                  <th style={{...THL, minWidth:240}}>Postes</th>
                  {CF.map(p=><th key={p.y} style={TH}>An {p.y}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  { l:"I. FLUX D'EXPLOITATION",  sep:1 },
                  { l:"+ Résultat net",            k:"rnet" },
                  { l:"+ DAP (non-cash)",          k:"dap" },
                  { l:"= CAF (Capac. Autofinancement)",k:"caf", hi:1 },
                  { l:"(-) Variation BFR",         k:"var_bfr", ng:1 },
                  { l:"= Flux nets exploitation",  k:"flux_exp", hi:1, ac:1 },
                  { l:"II. FLUX D'INVESTISSEMENT", sep:1 },
                  { l:"Acquisitions immos (An 0)", k:"flux_inv", mu:1 },
                  { l:"= Flux nets invest.",       k:"flux_inv", hi:1, mu:1 },
                  { l:"III. FLUX DE FINANCEMENT",  sep:1 },
                  { l:"(-) Remb. capital emprunt", k:"remb", ng:1 },
                  { l:"(-) Dividendes",            k:"divid", ng:1 },
                  { l:"= Flux nets financement",   k:"flux_fin", hi:1 },
                  { l:"VARIATION TRÉSORERIE NETTE",k:"var_treso", hi:1, ac:2 },
                  { l:"TRÉSORERIE CUMULÉE",        k:"treso", hi:1, ac:1 },
                  { l:"DSCR (Debt Service Cover.)",k:"dscr", hi:1, xR:1 },
                ].map((row,ri) => (
                  row.sep
                    ? <tr key={ri}><td colSpan={CF.length+1} style={{ padding:"8px 9px 4px", fontSize:9, color:"#f0a500", fontWeight:700, textTransform:"uppercase", letterSpacing:1, background:"rgba(240,165,0,0.04)", borderBottom:"1px solid rgba(240,165,0,0.12)" }}>{row.l}</td></tr>
                    : <tr key={ri} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)", background:row.hi?"rgba(240,165,0,0.03)":"transparent" }}>
                        <td style={row_sl(row.hi,row.ac,row.mu)}>{row.l}</td>
                        {CF.map(p => {
                          const v = p[row.k];
                          const display = row.xR ? (v!==null?v.toFixed(2)+"×":"—") : fmtI(v);
                          const color = row.ac===2?(v>0?"#2ecc8a":v<0?"#e05c2a":"#7a8299"):row.ac?"#f0a500":row.hi?"#e8eaf0":row.ng?"#e05c2a":row.mu?"#555e77":"#a0a8c0";
                          return <td key={p.y} style={{...row_s(row.hi,false,row.ng,row.mu), color}}>{display}</td>;
                        })}
                      </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding:"10px 14px", borderTop:"1px solid #252b38", fontSize:10, color:"#7a8299" }}>
            💡 DSCR (Debt Service Coverage Ratio) ≥ 1.25 exigé par les banques. CAF = résultat net + amortissements = flux de trésorerie disponible avant variation BFR.
          </div>
        </div>
      )}

      {/* ── BILAN PRÉVISIONNEL ── */}
      {sub==="bs" && (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[0,1,2,3,4,5].map(yr => {
            const bs = BS[yr];
            if (!bs) return null;
            const { actif:A, passif:P } = bs;
            const diff = Math.abs(A.total - P.total);
            return (
              <div key={yr} style={{ background:"#111419", border:"1px solid #252b38", borderRadius:11, overflow:"hidden" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 14px", background:"#181c24", borderBottom:"1px solid #252b38" }}>
                  <div style={{ fontSize:11, fontWeight:700 }}>{yr===0?"📅 Bilan initial (Année 0)":`📅 Bilan An ${yr}`}</div>
                  {diff > 1 && <div style={{ fontSize:9, color:"#e05c2a" }}>Δ {fmtI(diff)}</div>}
                  {diff <= 1 && <div style={{ fontSize:9, color:"#2ecc8a" }}>✓ Équilibré</div>}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }}>
                  {/* ACTIF */}
                  <div style={{ borderRight:"1px solid #252b38" }}>
                    <div style={{ padding:"6px 10px", background:"rgba(74,158,255,0.06)", fontSize:9, fontWeight:700, color:"#4a9eff", letterSpacing:1 }}>ACTIF</div>
                    {[
                      { l:"Immos brutes",       v:A.immos_brutes, mu:1 },
                      { l:"(-) Amortissements", v:-A.amort, mu:1 },
                      { l:"= Immos nettes",     v:A.immos_nettes, hi:1 },
                      { l:"Frais établissement",v:A.frais_etab, mu:1 },
                      { l:"Stocks",             v:A.stocks },
                      { l:"Créances clients",   v:A.creances },
                      { l:"Trésorerie",         v:A.treso, hi:1 },
                      { l:"TOTAL ACTIF",        v:A.total, ac:1 },
                    ].map((r,i) => (
                      <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"4px 10px", borderBottom:"1px solid rgba(255,255,255,0.03)", background:r.ac?"rgba(240,165,0,0.04)":r.hi?"rgba(255,255,255,0.02)":"transparent" }}>
                        <span style={{ fontSize:10, color:r.ac?"#f0a500":r.hi?"#e8eaf0":r.mu?"#555e77":"#a0a8c0", fontWeight:r.ac?700:400 }}>{r.l}</span>
                        <span style={{ fontSize:10, color:r.ac?"#f0a500":r.hi?"#e8eaf0":"#7a8299", fontWeight:r.ac||r.hi?700:400 }}>{fmtI(r.v)}</span>
                      </div>
                    ))}
                  </div>
                  {/* PASSIF */}
                  <div>
                    <div style={{ padding:"6px 10px", background:"rgba(46,204,138,0.06)", fontSize:9, fontWeight:700, color:"#2ecc8a", letterSpacing:1 }}>PASSIF</div>
                    {[
                      { l:"Capital social",     v:P.capital, mu:1 },
                      { l:"Réserves légales",   v:P.reserves, mu:1 },
                      { l:"Report à nouveau",   v:P.rna, mu:1 },
                      { l:"Résultat exercice",  v:P.resultat, hi:1 },
                      { l:"= CAPITAUX PROPRES", v:P.cp, ac:1 },
                      { l:"Dettes financières LT",v:P.dettes_lt, ng:P.dettes_lt>0 },
                      { l:"Dettes fournisseurs", v:P.dettes_frs },
                      { l:"Dettes fiscales & soc",v:P.dettes_fisc },
                      { l:"TOTAL PASSIF",        v:P.total, ac:1 },
                    ].map((r,i) => (
                      <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"4px 10px", borderBottom:"1px solid rgba(255,255,255,0.03)", background:r.ac?"rgba(46,204,138,0.04)":r.hi?"rgba(255,255,255,0.02)":"transparent" }}>
                        <span style={{ fontSize:10, color:r.ac?"#2ecc8a":r.hi?"#e8eaf0":r.mu?"#555e77":"#a0a8c0", fontWeight:r.ac?700:400 }}>{r.l}</span>
                        <span style={{ fontSize:10, color:r.ac?"#2ecc8a":r.ng?"#e05c2a":r.hi?"#e8eaf0":"#7a8299", fontWeight:r.ac||r.hi?700:400 }}>{fmtI(r.v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── PLAN DE FINANCEMENT ── */}
      {sub==="plan" && (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {/* Plan de financement initial */}
          <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:11, overflow:"hidden" }}>
            <div style={{ padding:"9px 14px", background:"#181c24", borderBottom:"1px solid #252b38", fontSize:11, fontWeight:700 }}>🏗️ Plan de financement initial</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }}>
              <div style={{ borderRight:"1px solid #252b38" }}>
                <div style={{ padding:"6px 10px", background:"rgba(224,92,42,0.06)", fontSize:9, fontWeight:700, color:"#e05c2a", letterSpacing:1 }}>EMPLOIS (Besoins)</div>
                {[
                  { l:"Immobilisations",       v:immos_brutes },
                  { l:"Frais d'établissement", v:frais_etab },
                  { l:"BFR initial",           v:bfr_init },
                  { l:"Trésorerie sécurité",   v:treso_init },
                  { l:"TOTAL EMPLOIS",         v:invest_total, ac:1 },
                ].map((r,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"5px 10px", borderBottom:"1px solid rgba(255,255,255,0.03)", background:r.ac?"rgba(224,92,42,0.05)":"transparent" }}>
                    <span style={{ fontSize:10, color:r.ac?"#e05c2a":"#a0a8c0", fontWeight:r.ac?700:400 }}>{r.l}</span>
                    <span style={{ fontSize:10, color:r.ac?"#e05c2a":"#7a8299", fontWeight:r.ac?700:400 }}>{fmtI(r.v)}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ padding:"6px 10px", background:"rgba(46,204,138,0.06)", fontSize:9, fontWeight:700, color:"#2ecc8a", letterSpacing:1 }}>RESSOURCES</div>
                {[
                  { l:"Apport en capital",      v:capital_propre },
                  { l:"Emprunt bancaire / IMF",  v:loan_amt },
                  { l:"Subventions / dons",      v:0, mu:1 },
                  { l:"TOTAL RESSOURCES",        v:invest_total, ac:1 },
                ].map((r,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"5px 10px", borderBottom:"1px solid rgba(255,255,255,0.03)", background:r.ac?"rgba(46,204,138,0.05)":"transparent" }}>
                    <span style={{ fontSize:10, color:r.ac?"#2ecc8a":r.mu?"#555e77":"#a0a8c0", fontWeight:r.ac?700:400 }}>{r.l}</span>
                    <span style={{ fontSize:10, color:r.ac?"#2ecc8a":"#7a8299", fontWeight:r.ac?700:400 }}>{fmtI(r.v)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Seuil de rentabilité */}
          <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:11, padding:16 }}>
            <div style={{ fontSize:11, fontWeight:700, marginBottom:12 }}>📍 Seuil de rentabilité mensuel</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
              <div style={{ background:"#181c24", borderRadius:9, padding:"12px 13px" }}>
                <div style={{ fontSize:9, color:"#7a8299", marginBottom:4 }}>SEUIL (CA mensuel min.)</div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:"#f0a500" }}>{fmtI(seuil_M)}</div>
                <div style={{ fontSize:9, color:"#7a8299", marginTop:3 }}>à atteindre chaque mois</div>
              </div>
              <div style={{ background:"#181c24", borderRadius:9, padding:"12px 13px" }}>
                <div style={{ fontSize:9, color:"#7a8299", marginBottom:4 }}>% DU CA PRÉVU</div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:seuil_pct<80?"#2ecc8a":"#e05c2a" }}>{seuil_pct!==null?seuil_pct.toFixed(1)+"%":"—"}</div>
                <div style={{ fontSize:9, color:"#7a8299", marginTop:3 }}>{seuil_pct<80?"Marge de sécurité OK":"Risque élevé"}</div>
              </div>
              <div style={{ background:"#181c24", borderRadius:9, padding:"12px 13px" }}>
                <div style={{ fontSize:9, color:"#7a8299", marginBottom:4 }}>TAUX MARGE VARIABLE</div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:"#4a9eff" }}>{pct(tx_mv)}</div>
                <div style={{ fontSize:9, color:"#7a8299", marginTop:3 }}>sur coûts variables</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DCF & VAN ── */}
      {sub==="dcf" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {/* KPIs VAN/TRI */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:9 }}>
            <div style={{ background:"#111419", border:`1px solid ${van>=0?"rgba(46,204,138,0.3)":"rgba(224,92,42,0.3)"}`, borderRadius:11, padding:"14px 16px" }}>
              <div style={{ fontSize:9, color:"#7a8299", marginBottom:6 }}>VAN (Valeur Actuelle Nette)</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:28, fontWeight:700, color:van>=0?"#2ecc8a":"#e05c2a" }}>{fmtI(van)}</div>
              <div style={{ fontSize:9, color:"#7a8299", marginTop:4 }}>à {(wacc*100).toFixed(0)}% de taux d'actualisation (WACC zone)</div>
              <div style={{ fontSize:10, color:van>=0?"#2ecc8a":"#e05c2a", marginTop:5, fontWeight:700 }}>{van>=0?"✅ Projet créateur de valeur":"⚠️ Projet détruit de la valeur"}</div>
            </div>
            <div style={{ background:"#111419", border:`1px solid ${tri>wacc?"rgba(46,204,138,0.3)":"rgba(224,92,42,0.3)"}`, borderRadius:11, padding:"14px 16px" }}>
              <div style={{ fontSize:9, color:"#7a8299", marginBottom:6 }}>TRI (Taux de Rendement Interne)</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:28, fontWeight:700, color:tri>wacc?"#2ecc8a":"#e05c2a" }}>{pct(tri)}</div>
              <div style={{ fontSize:9, color:"#7a8299", marginTop:4 }}>Seuil minimum (WACC) : {(wacc*100).toFixed(0)}%</div>
              <div style={{ fontSize:10, color:tri>wacc?"#2ecc8a":"#e05c2a", marginTop:5, fontWeight:700 }}>{tri>wacc?"✅ TRI > WACC : rentable":"⚠️ TRI < WACC : insuffisant"}</div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:9 }}>
            <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:9, padding:"11px 13px" }}>
              <div style={{ fontSize:9, color:"#7a8299", marginBottom:4 }}>Valeur terminale (VT)</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:18, fontWeight:700, color:"#4a9eff" }}>{fmtI(tv)}</div>
              <div style={{ fontSize:9, color:"#555e77", marginTop:2 }}>VT actualisée : {fmtI(tv_pv)}</div>
            </div>
            <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:9, padding:"11px 13px" }}>
              <div style={{ fontSize:9, color:"#7a8299", marginBottom:4 }}>Délai récup. actualisé</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:18, fontWeight:700, color:"#f0a500" }}>{payback_d ? payback_d+" an"+(payback_d>1?"s":"") : "Non atteint"}</div>
            </div>
            <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:9, padding:"11px 13px" }}>
              <div style={{ fontSize:9, color:"#7a8299", marginBottom:4 }}>VAN / Investissement</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:18, fontWeight:700, color:van_pct>=0?"#2ecc8a":"#e05c2a" }}>{van_pct.toFixed(0)}%</div>
            </div>
          </div>
          {/* Table DCF */}
          <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:11, overflow:"hidden" }}>
            <div style={{ padding:"9px 14px", background:"#181c24", borderBottom:"1px solid #252b38", fontSize:11, fontWeight:700 }}>📈 Tableau des flux actualisés (WACC = {(wacc*100).toFixed(0)}%)</div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr>
                    <th style={{...THL, minWidth:200}}>Postes</th>
                    <th style={TH}>An 0</th>
                    {IS.map(p=><th key={p.y} style={TH}>An {p.y}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { l:"CAF",                     vals: [null, ...fin.cafs] },
                    { l:`Facteur actual. (1+${(wacc*100).toFixed(0)}%)^n`, vals: [1,...IS.map((_,i)=>1/Math.pow(1+wacc,i+1))], fmt_pct:1 },
                    { l:"CAF actualisée",           vals: [null,...dcf_val], hi:1 },
                    { l:"Flux nets (invest.-init.)",vals: [-fin.invest_total,...fin.cafs] },
                    { l:"Flux nets actualisés",     vals: [-fin.invest_total,...dcf_val], hi:1 },
                    { l:"Cumul actualisé",          vals: (() => { let c = 0; return [-fin.invest_total,...dcf_val.map(v=>(c+=v,c))]; })(), hi:1, ac:1 },
                  ].map((row,ri) => (
                    <tr key={ri} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)", background:row.hi?"rgba(240,165,0,0.03)":"transparent" }}>
                      <td style={row_sl(row.hi,row.ac,false)}>{row.l}</td>
                      {row.vals.map((v,i) => (
                        <td key={i} style={{ padding:"5px 9px", fontSize:10, textAlign:"right", fontWeight:row.hi?700:400,
                          color: v===null?"#555e77":row.ac?(v>=0?"#2ecc8a":"#e05c2a"):row.hi?"#f0a500":v<0?"#e05c2a":"#7a8299",
                          whiteSpace:"nowrap" }}>
                          {v===null?"—":row.fmt_pct?v.toFixed(3):fmtI(v)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── RATIOS BANCAIRES ── */}
      {sub==="ratios" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ background:"rgba(240,165,0,0.05)", border:"1px solid rgba(240,165,0,0.2)", borderRadius:10, padding:"11px 14px", fontSize:11, lineHeight:1.7 }}>
            <strong style={{color:"#f0a500"}}>🏦 Critères d'analyse bancaire</strong> — Ces ratios sont les indicateurs clés examinés par les banques et les investisseurs institutionnels pour décider d'octroyer un financement.
          </div>
          {/* Grille ratios An 1 à An 5 */}
          <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:11, overflow:"hidden" }}>
            <div style={{ padding:"9px 14px", background:"#181c24", borderBottom:"1px solid #252b38", fontSize:11, fontWeight:700 }}>Tableau des ratios financiers</div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr>
                    <th style={{...THL, minWidth:200}}>Ratio</th>
                    <th style={{...TH, color:"#a0a8c0"}}>Cible banque</th>
                    {RA.map(r=><th key={r.y} style={TH}>An {r.y}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { l:"DSCR (couverture dette)",      k:"dscr",      target:1.25, unit:"x", invert:false },
                    { l:"Levier financier (D/CP)",      k:"levier",    target:3,    unit:"x", invert:true  },
                    { l:"Autonomie financière (CP/TP)", k:"autonomie", target:0.30, unit:"%", invert:false },
                    { l:"Couverture intérêts (EBIT/Fi)",k:"couv_int",  target:3,    unit:"x", invert:false },
                    { l:"ROE (Rent. capitaux propres)", k:"roe",       target:0.15, unit:"%", invert:false },
                    { l:"Marge EBITDA",                 k:"marge_ebitda",target:0.15,unit:"%",invert:false },
                    { l:"Marge nette",                  k:"marge_nette",target:0.05,unit:"%",invert:false },
                  ].map((row,ri) => (
                    <tr key={ri} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding:"6px 10px", fontSize:10, color:"#a0a8c0" }}>{row.l}</td>
                      <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right", color:"#555e77" }}>
                        {row.unit==="x" ? `>${row.target}×` : `>${pct(row.target)}`}
                        {row.invert ? ` (max ${row.unit==="x"?row.target+"×":pct(row.target)})` : ""}
                      </td>
                      {RA.map(r => {
                        const v = r[row.k];
                        const ok = v !== null ? (row.invert ? v <= row.target : v >= row.target) : null;
                        const disp = v === null ? "—" : row.unit==="x" ? v.toFixed(2)+"×" : pct(v);
                        return <td key={r.y} style={{ padding:"6px 10px", fontSize:10, textAlign:"right", fontWeight:700, color:ok===null?"#555e77":ok?"#2ecc8a":"#e05c2a", whiteSpace:"nowrap" }}>{disp}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Interprétation An 1 */}
          <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:11, padding:14 }}>
            <div style={{ fontSize:11, fontWeight:700, marginBottom:10 }}>🔍 Interprétation An 1 (exigences bancaires)</div>
            <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
              {[
                { label:"DSCR", v:RA[0]?.dscr, target:1.25, unit:"x", desc:"≥ 1.25 requis pour tout prêt bancaire. Indique si le cash-flow couvre le service de la dette." },
                { label:"Autonomie financière", v:RA[0]?.autonomie, target:0.30, unit:"%", desc:"≥ 30% des ressources = capitaux propres. Indicateur de solidité financière." },
                { label:"Marge EBITDA", v:RA[0]?.marge_ebitda, target:0.10, unit:"%", desc:"≥ 10% recommandé. Mesure la performance opérationnelle pure (avant intérêts et IS)." },
              ].map(item => {
                const ok = item.v !== null ? item.v >= item.target : null;
                return (
                  <div key={item.label} style={{ display:"flex", gap:12, alignItems:"flex-start", padding:"9px 12px", background:"#181c24", borderRadius:8 }}>
                    <div style={{ width:38, height:38, borderRadius:9, background:ok===null?"#252b38":ok?"rgba(46,204,138,0.15)":"rgba(224,92,42,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ fontFamily:"Georgia,serif", fontSize:13, fontWeight:700, color:ok===null?"#7a8299":ok?"#2ecc8a":"#e05c2a" }}>{item.v===null?"—":item.unit==="x"?item.v.toFixed(2)+"×":pct(item.v)}</span>
                    </div>
                    <div>
                      <div style={{ fontSize:11, fontWeight:700, marginBottom:2 }}>{item.label} {ok!==null&&<span style={{color:ok?"#2ecc8a":"#e05c2a", fontSize:10}}>{ok?" ✅ Conforme":" ⚠️ En dessous"}</span>}</div>
                      <div style={{ fontSize:10, color:"#7a8299", lineHeight:1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── TABLEAU AMORTISSEMENT EMPRUNT ── */}
      {sub==="loan" && (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ background:"rgba(74,158,255,0.05)", border:"1px solid rgba(74,158,255,0.18)", borderRadius:10, padding:"11px 14px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#4a9eff", marginBottom:5 }}>💸 Tableau d'amortissement de l'emprunt</div>
            <div style={{ display:"flex", gap:12, fontSize:10, color:"#a0a8c0" }}>
              <span>Capital : <strong style={{color:"#4a9eff"}}>{fmtI(loan_amt)}</strong></span>
              <span>Taux : <strong style={{color:"#4a9eff"}}>{(loanRate*100).toFixed(1)}%/an</strong></span>
              <span>Durée : <strong style={{color:"#4a9eff"}}>5 ans</strong></span>
              <span>Mensualité : <strong style={{color:"#f0a500"}}>{fmtI(mensualite)}/mois</strong></span>
            </div>
          </div>
          {loan_amt > 0 ? (
            <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:11, overflow:"hidden" }}>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr>
                      {["Année","Capital restant dû","Capital remb.","Intérêts","Annuité totale","% Capital","% Intérêts"].map(h=>(
                        <th key={h} style={TH}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {LT.map((row,i) => (
                      <tr key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right", fontWeight:700 }}>An {row.y}</td>
                        <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right", color:"#4a9eff" }}>{fmtI(row.balance)}</td>
                        <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right", color:"#2ecc8a", fontWeight:700 }}>{fmtI(row.cap)}</td>
                        <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right", color:"#e05c2a" }}>{fmtI(row.int)}</td>
                        <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right", fontWeight:700 }}>{fmtI(row.annuite)}</td>
                        <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right", color:"#2ecc8a" }}>{pct(row.cap/loan_amt)}</td>
                        <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right", color:"#e05c2a" }}>{pct(row.int/loan_amt)}</td>
                      </tr>
                    ))}
                    <tr style={{ background:"rgba(240,165,0,0.04)", borderTop:"1px solid rgba(240,165,0,0.2)" }}>
                      <td style={{ padding:"6px 10px", fontSize:10, fontWeight:700, textAlign:"right", color:"#f0a500" }}>TOTAL</td>
                      <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right" }}>—</td>
                      <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right", fontWeight:700, color:"#2ecc8a" }}>{fmtI(LT.reduce((a,r)=>a+r.cap,0))}</td>
                      <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right", fontWeight:700, color:"#e05c2a" }}>{fmtI(LT.reduce((a,r)=>a+r.int,0))}</td>
                      <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right", fontWeight:700, color:"#f0a500" }}>{fmtI(LT.reduce((a,r)=>a+r.annuite,0))}</td>
                      <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right", color:"#2ecc8a", fontWeight:700 }}>100%</td>
                      <td style={{ padding:"6px 10px", fontSize:10, textAlign:"right", color:"#e05c2a" }}>{pct(LT.reduce((a,r)=>a+r.int,0)/loan_amt)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:10, padding:20, textAlign:"center", color:"#555e77", fontSize:12 }}>
              Aucun emprunt identifié dans votre plan de financement.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════

// Load PptxGenJS from CDN
function loadPptxGenJS() {
  return new Promise((resolve, reject) => {
    if (window.PptxGenJS) { resolve(window.PptxGenJS); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/pptxgenjs/3.12.0/pptxgen.bundle.js";
    s.onload = () => resolve(window.PptxGenJS);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

const PC = {
  bg:"0A0C10", bg2:"111419", bg3:"181C24", border:"252B38",
  gold:"F0A500", orange:"E05C2A", green:"2ECC8A", blue:"4A9EFF",
  text:"E8EAF0", muted:"7A8299", white:"FFFFFF",
};
const mkSh = () => ({ type:"outer", blur:14, offset:4, angle:135, color:"000000", opacity:0.3 });
const mkCsh = () => ({ type:"outer", blur:20, offset:6, angle:135, color:"000000", opacity:0.4 });

function pAddAccent(slide) {
  slide.addShape("rect",{x:0,y:0,w:10,h:0.05,fill:{color:PC.gold}});
  slide.addShape("rect",{x:5.5,y:0,w:4.5,h:0.05,fill:{color:PC.orange}});
}
function pChip(slide, label, x, y, color) {
  const w = Math.max(1.6, label.length * 0.092 + 0.3);
  slide.addShape("roundRect",{x,y,w,h:0.27,fill:{color:color||PC.gold,transparency:85},rectRadius:0.05});
  slide.addText(label,{x,y,w,h:0.27,fontSize:8,bold:true,color:color||PC.gold,align:"center",valign:"middle",charSpacing:2});
}
function pStat(slide, x, y, w, h, value, label, color, sub) {
  slide.addShape("rect",{x,y,w,h,fill:{color:PC.bg2},shadow:mkCsh()});
  slide.addShape("rect",{x,y,w,h:0.04,fill:{color:color||PC.gold}});
  slide.addText(value,{x:x+0.12,y:y+0.2,w:w-0.24,h:0.7,fontSize:28,bold:true,color:color||PC.gold,fontFace:"Georgia",align:"center",valign:"middle",margin:0});
  slide.addText(label,{x:x+0.08,y:y+0.88,w:w-0.16,h:0.22,fontSize:9,color:PC.muted,align:"center",valign:"top",margin:0,charSpacing:1});
  if(sub) slide.addText(sub,{x:x+0.08,y:y+1.08,w:w-0.16,h:0.18,fontSize:8,color:color||PC.gold,align:"center",valign:"top",margin:0});
}

async function generatePitchDeck(data, pitchMeta, uploadedDoc, setStatus) {
  setStatus("📦 Chargement de la librairie...");
  let PptxGenJS;
  try { PptxGenJS = await loadPptxGenJS(); }
  catch { setStatus(null); alert("Impossible de charger PptxGenJS. Vérifiez votre connexion."); return; }

  setStatus("🧠 Enrichissement IA du contenu...");
  const { invest, revM, charges, cfM, cfA, roi, payback, marge, yearsC, cur } = calcFin(data);

  // Get AI-enriched pitch content
  let ai = {};
  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        model:"claude-sonnet-4-20250514", max_tokens:3000,
        system:"Expert investissement et startup. Retourne UNIQUEMENT du JSON valide sans markdown ni backticks.",
        messages:[{role:"user",content:`Génère le contenu d'un pitch deck investisseur de classe mondiale pour ce projet. JSON avec ces champs (strings concises, percutantes comme pour YC/I&P/Partech):
{
  "tagline": "tagline en 8 mots max, accrocheur",
  "problem1_title": "titre problème 1",
  "problem1_desc": "description 1-2 phrases choc",
  "problem2_title": "titre problème 2", 
  "problem2_desc": "description 1-2 phrases",
  "problem3_title": "titre problème 3",
  "problem3_desc": "description 1-2 phrases",
  "problem_quote": "citation impactante 1 phrase sur le problème",
  "solution_desc": "description solution 2-3 phrases, bénéfices clairs",
  "tam": "marché total en $",
  "sam": "marché adressable en $",
  "som": "cible 3 ans en $",
  "positioning": "positionnement en 1 phrase",
  "moat1": "avantage défendable 1",
  "moat2": "avantage défendable 2",
  "moat3": "avantage défendable 3",
  "channel1": "canal acquisition principal",
  "channel2": "canal acquisition secondaire",
  "risk1": "risque principal et mitigation en 1 phrase",
  "risk2": "risque 2 et mitigation",
  "closing_tagline": "phrase de clôture inspirante",
  "raise_amount": "montant levée suggéré (ex: $500K)",
  "valuation": "valorisation suggérée pre-money",
  "investor_roi": "ROI investisseur estimé (ex: 8-15x)"
}
Données projet: type=${data.type_projet}, zone=${data.zone_geo}, présentation=${data.presentation?.substring(0,300)}, marché=${data.marche_clients?.substring(0,200)}, invest=${data.investissement_initial}, revenus=${data.revenus_ventes}, financement=${data.financement}, nom=${pitchMeta.company||data.type_projet}`}]
      })
    });
    const r = await resp.json();
    ai = JSON.parse((r.content?.[0]?.text||"{}").replace(/```json|```/g,"").trim());
  } catch(e) { ai = {}; }

  setStatus("🎨 Construction des slides...");

  const pres = new PptxGenJS();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Filano AI";
  pres.title = `Pitch Deck — ${pitchMeta.company || data.type_projet}`;

  function newSlide(bg) {
    const s = pres.addSlide();
    s.background = { color: bg || PC.bg };
    return s;
  }

  // ── S1: COVER ──
  {
    const s = newSlide();
    s.addShape("rect",{x:7.5,y:0,w:2.5,h:5.625,fill:{color:"0D1117"}});
    s.addShape("rect",{x:8.18,y:0,w:0.06,h:5.625,fill:{color:PC.gold,transparency:55}});
    s.addShape("rect",{x:9.0,y:0,w:0.04,h:5.625,fill:{color:PC.orange,transparency:65}});
    s.addShape("rect",{x:0.7,y:0.52,w:0.62,h:0.62,fill:{color:PC.gold},shadow:mkSh()});
    s.addText("F",{x:0.7,y:0.52,w:0.62,h:0.62,fontSize:24,bold:true,color:PC.bg,align:"center",valign:"middle",fontFace:"Georgia",margin:0});
    s.addText(pitchMeta.company||"Filano",{x:1.46,y:0.53,w:3,h:0.60,fontSize:22,bold:true,color:PC.gold,fontFace:"Georgia",valign:"middle",margin:0});
    s.addText((data.type_projet||"STARTUP").toUpperCase(),{x:0.7,y:1.52,w:6.5,h:0.42,fontSize:11,bold:true,color:PC.muted,charSpacing:4,valign:"middle",margin:0});
    s.addText(pitchMeta.company||data.type_projet||"Votre Startup",{x:0.7,y:2.0,w:6.4,h:1.0,fontSize:44,bold:true,color:PC.white,fontFace:"Georgia",valign:"top",margin:0,lineSpacingMultiple:1});
    s.addText(ai.tagline||pitchMeta.tagline||"La meilleure solution du marché",{x:0.7,y:3.1,w:6.4,h:0.44,fontSize:16,color:PC.gold,italic:true,valign:"middle",margin:0});
    s.addShape("rect",{x:0.7,y:3.66,w:3,h:0.03,fill:{color:PC.border}});
    const metas=[["🌍",data.zone_geo?.split("(")[0]?.trim()||"Afrique"],["💰",ai.raise_amount||pitchMeta.raise||"Levée de fonds"],["📅",new Date().getFullYear().toString()]];
    metas.forEach((m,i)=>s.addText(`${m[0]}  ${m[1]}`,{x:0.7+i*2.2,y:3.82,w:2.1,h:0.3,fontSize:10,color:PC.muted,valign:"middle",margin:0}));
    s.addText("INVESTOR\nPRESENTATION",{x:7.55,y:1.95,w:2.1,h:1.2,fontSize:11,bold:true,color:PC.gold,align:"center",charSpacing:3,lineSpacingMultiple:1.8,margin:0});
    s.addShape("ellipse",{x:8.1,y:4.15,w:1.0,h:1.0,fill:{color:PC.gold,transparency:88}});
    s.addText("CONFIDENTIEL",{x:0,y:5.3,w:10,h:0.325,fontSize:8,color:PC.muted,align:"center",valign:"middle",margin:0});
  }

  // ── S2: PROBLEM ──
  {
    const s = newSlide(); pAddAccent(s);
    pChip(s,"01  PROBLÈME",0.55,0.15);
    s.addText("Le problème que nous résolvons",{x:0.55,y:0.55,w:9,h:0.62,fontSize:28,bold:true,color:PC.white,fontFace:"Georgia",valign:"middle",margin:0});
    const pains=[
      {icon:"😤",t:ai.problem1_title||"Accès limité au financement",d:ai.problem1_desc||"80% des PME rejetées par les banques faute d'accompagnement.",col:PC.gold},
      {icon:"📉",t:ai.problem2_title||"Manque d'outils d'analyse",d:ai.problem2_desc||"Les entrepreneurs n'ont pas accès aux outils des grandes entreprises.",col:PC.orange},
      {icon:"🔎",t:ai.problem3_title||"Opacité du marché",d:ai.problem3_desc||"Les conditions de financement sont difficiles à trouver.",col:PC.blue},
    ];
    pains.forEach((p,i)=>{
      const x=0.55+i*3.12;
      s.addShape("rect",{x,y:1.42,w:2.9,h:3.68,fill:{color:PC.bg2},shadow:mkCsh()});
      s.addShape("rect",{x,y:1.42,w:2.9,h:0.06,fill:{color:p.col}});
      s.addText(p.icon,{x,y:1.6,w:2.9,h:0.65,fontSize:26,align:"center",margin:0});
      s.addText(p.t,{x:x+0.15,y:2.38,w:2.6,h:0.58,fontSize:13,bold:true,color:PC.white,align:"center",valign:"top",margin:0});
      s.addText(p.d,{x:x+0.15,y:3.05,w:2.6,h:1.82,fontSize:10.5,color:PC.muted,align:"center",lineSpacingMultiple:1.4,margin:0});
    });
    s.addText(`"${ai.problem_quote||"Le problème est réel, massif et non résolu."}"`,{x:0.55,y:5.2,w:9,h:0.28,fontSize:10,color:PC.gold,italic:true,align:"center",margin:0});
  }

  // ── S3: SOLUTION ──
  {
    const s = newSlide(); pAddAccent(s);
    pChip(s,"02  SOLUTION",0.55,0.15);
    s.addText("Notre solution",{x:0.55,y:0.55,w:4.5,h:0.62,fontSize:28,bold:true,color:PC.white,fontFace:"Georgia",valign:"middle",margin:0});
    s.addText(ai.solution_desc||data.presentation||"Une solution IA complète qui guide les entrepreneurs pas à pas.",{x:0.55,y:1.3,w:4.5,h:1.1,fontSize:12,color:PC.muted,lineSpacingMultiple:1.5,valign:"top",margin:0});
    const feats=[["🧠","Analyse IA"],["📊","Projections 5 ans"],["💰","Matching financement"],["🗺️","Roadmap sectorielle"],["📄","Business plan IA"],["🎯","Pitch Deck auto"]];
    feats.forEach((f,i)=>{
      const row=Math.floor(i/2),col=i%2,x=0.55+col*2.22,y=2.62+row*0.62;
      s.addShape("rect",{x,y,w:2.05,h:0.46,fill:{color:PC.bg3}});
      s.addShape("rect",{x,y,w:0.04,h:0.46,fill:{color:PC.gold}});
      s.addText(`${f[0]}  ${f[1]}`,{x:x+0.12,y,w:1.9,h:0.46,fontSize:10.5,bold:true,color:PC.text,valign:"middle",margin:0});
    });
    s.addShape("rect",{x:5.42,y:0.5,w:4.2,h:4.9,fill:{color:PC.bg2},shadow:mkCsh()});
    s.addText("COMMENT ÇA MARCHE",{x:5.62,y:0.68,w:3.8,h:0.3,fontSize:8,bold:true,color:PC.gold,charSpacing:2,align:"center",margin:0});
    const steps=[["1","Questionnaire IA","9 questions guidées"],["2","Analyse financière","Projections, ROI, scénarios"],["3","Matching financement","Sources adaptées à votre zone"],["4","Roadmap & Stratégie","Plan de lancement sectoriel"],["5","Pitch Deck pro","Présentation investisseurs auto"]];
    steps.forEach(([n,t,d],i)=>{
      const y=1.12+i*0.77;
      s.addShape("ellipse",{x:5.72,y:y+0.04,w:0.42,h:0.42,fill:{color:PC.gold}});
      s.addText(n,{x:5.72,y:y+0.04,w:0.42,h:0.42,fontSize:13,bold:true,color:PC.bg,align:"center",valign:"middle",margin:0});
      if(i<4) s.addShape("rect",{x:5.9,y:y+0.46,w:0.06,h:0.36,fill:{color:PC.border}});
      s.addText(t,{x:6.28,y:y+0.03,w:3.1,h:0.25,fontSize:11,bold:true,color:PC.white,valign:"middle",margin:0});
      s.addText(d,{x:6.28,y:y+0.28,w:3.1,h:0.2,fontSize:9,color:PC.muted,valign:"top",margin:0});
    });
  }

  // ── S4: MARKET ──
  {
    const s = newSlide(); pAddAccent(s);
    pChip(s,"03  MARCHÉ",0.55,0.15);
    s.addText("Opportunité de marché",{x:0.55,y:0.55,w:9,h:0.62,fontSize:28,bold:true,color:PC.white,fontFace:"Georgia",valign:"middle",margin:0});
    const mkts=[{l:"TAM",t:"Marché Total",v:ai.tam||"$180B",d:"Toutes PME Afrique",col:PC.blue,x:0.55},{l:"SAM",t:"Adressable",v:ai.sam||"$42B",d:"Zone ciblée",col:PC.gold,x:3.55},{l:"SOM",t:"Cible 3 ans",v:ai.som||"$2.4B",d:"Marché capturable",col:PC.green,x:6.55}];
    mkts.forEach(m=>{
      s.addShape("rect",{x:m.x,y:1.42,w:2.9,h:3.85,fill:{color:PC.bg2},shadow:mkCsh()});
      s.addShape("rect",{x:m.x,y:1.42,w:2.9,h:0.06,fill:{color:m.col}});
      s.addShape("ellipse",{x:m.x+0.65,y:1.65,w:1.6,h:1.6,fill:{color:m.col,transparency:84}});
      s.addText(m.l,{x:m.x,y:1.65,w:2.9,h:1.6,fontSize:28,bold:true,color:m.col,align:"center",valign:"middle",fontFace:"Georgia",margin:0});
      s.addText(m.v,{x:m.x+0.12,y:3.4,w:2.66,h:0.52,fontSize:24,bold:true,color:m.col,align:"center",fontFace:"Georgia",margin:0});
      s.addText(m.t,{x:m.x+0.1,y:3.96,w:2.7,h:0.28,fontSize:11,bold:true,color:PC.text,align:"center",margin:0});
      s.addText(m.d,{x:m.x+0.1,y:4.26,w:2.7,h:0.7,fontSize:9.5,color:PC.muted,align:"center",lineSpacingMultiple:1.4,margin:0});
    });
    s.addText("📈  Croissance PME en zone ciblée : +11% CAGR  ·  Premier marché sous-pénétré de sa catégorie",{x:0.55,y:5.27,w:9,h:0.26,fontSize:9.5,color:PC.gold,align:"center",italic:true,margin:0});
  }

  // ── S5: BUSINESS MODEL ──
  {
    const s = newSlide(); pAddAccent(s);
    pChip(s,"04  BUSINESS MODEL",0.55,0.15);
    s.addText("Comment nous générons des revenus",{x:0.55,y:0.55,w:9,h:0.62,fontSize:28,bold:true,color:PC.white,fontFace:"Georgia",valign:"middle",margin:0});
    const streams=pitchMeta.streams||[
      {icon:"🔄",name:"Abonnement SaaS",price:"29–199 $/mois",desc:"3 niveaux : Starter / Pro / Enterprise. Revenus récurrents.",margin:"82%",col:PC.gold},
      {icon:"🤝",name:"Commissions",price:"1–2.5%",desc:"Commission sur financements obtenus via la plateforme.",margin:"94%",col:PC.green},
      {icon:"🏢",name:"Licences B2B",price:"500–5K$/mois",desc:"Banques, IMF, incubateurs qui embarquent l'outil.",margin:"88%",col:PC.blue},
      {icon:"📊",name:"Data & Insights",price:"Custom",desc:"Rapports anonymisés pour institutions financières.",margin:"96%",col:PC.orange},
    ];
    streams.forEach((st,i)=>{
      const col=i%2,row=Math.floor(i/2),x=0.55+col*4.72,y=1.5+row*1.95;
      s.addShape("rect",{x,y,w:4.5,h:1.75,fill:{color:PC.bg2},shadow:mkCsh()});
      s.addShape("rect",{x,y,w:0.06,h:1.75,fill:{color:st.col}});
      s.addShape("ellipse",{x:x+0.18,y:y+0.33,w:0.7,h:0.7,fill:{color:st.col,transparency:82}});
      s.addText(st.icon,{x:x+0.18,y:y+0.33,w:0.7,h:0.7,fontSize:18,align:"center",valign:"middle",margin:0});
      s.addText(st.name,{x:x+1.05,y:y+0.14,w:3.2,h:0.3,fontSize:13,bold:true,color:PC.white,valign:"middle",margin:0});
      s.addText(st.price,{x:x+1.05,y:y+0.46,w:2.2,h:0.28,fontSize:14,bold:true,color:st.col,fontFace:"Georgia",valign:"middle",margin:0});
      s.addShape("rect",{x:x+3.3,y:y+0.46,w:0.95,h:0.28,fill:{color:st.col,transparency:84}});
      s.addText(`Marge ${st.margin}`,{x:x+3.3,y:y+0.46,w:0.95,h:0.28,fontSize:8,bold:true,color:st.col,align:"center",valign:"middle",margin:0});
      s.addText(st.desc,{x:x+1.05,y:y+0.82,w:3.25,h:0.72,fontSize:9.5,color:PC.muted,lineSpacingMultiple:1.35,valign:"top",margin:0});
    });
  }

  // ── S6: FINANCIALS ──
  {
    const s = newSlide(); pAddAccent(s);
    pChip(s,"05  PROJECTIONS FINANCIÈRES",0.55,0.15);
    s.addText("Plan financier 5 ans",{x:0.55,y:0.55,w:9,h:0.62,fontSize:28,bold:true,color:PC.white,fontFace:"Georgia",valign:"middle",margin:0});
    const yrs=["An 1","An 2","An 3","An 4","An 5"];
    const mult=cur==="FCFA"?1e-6:1e-3;
    const unit=cur==="FCFA"?"M FCFA":"K "+cur;
    const revs=yearsC.map(r=>Math.round(r.rev*mult));
    const costs=yearsC.map(r=>Math.round(r.ch*mult));
    s.addChart("bar",[
      {name:`Revenus (${unit})`,labels:yrs,values:revs},
      {name:`Charges (${unit})`,labels:yrs,values:costs},
    ],{
      x:0.55,y:1.38,w:5.9,h:2.85,barDir:"col",barGrouping:"clustered",
      chartColors:[PC.gold,PC.orange],
      chartArea:{fill:{color:PC.bg2}},
      catAxisLabelColor:PC.muted,valAxisLabelColor:PC.muted,
      valGridLine:{color:PC.border,size:0.5},catGridLine:{style:"none"},
      showLegend:true,legendPos:"b",legendFontSize:9,legendColor:PC.muted,
      showValue:true,dataLabelFontSize:8,dataLabelColor:PC.text,
    });
    const profits=yearsC.map(r=>Math.round(r.cf*mult));
    s.addChart("line",[{name:`Bénéfice net (${unit})`,labels:yrs,values:profits}],{
      x:0.55,y:4.3,w:5.9,h:1.1,
      chartColors:[PC.green],lineSize:2.5,lineSmooth:true,
      chartArea:{fill:{color:PC.bg2}},
      catAxisLabelColor:PC.muted,valAxisLabelColor:PC.muted,
      valGridLine:{color:PC.border,size:0.5},catGridLine:{style:"none"},
      showLegend:false,showValue:true,dataLabelFontSize:7,dataLabelColor:PC.green,
    });
    s.addShape("rect",{x:6.72,y:1.38,w:2.9,h:4.02,fill:{color:PC.bg2},shadow:mkCsh()});
    s.addText("MÉTRIQUES CLÉS",{x:6.88,y:1.52,w:2.58,h:0.22,fontSize:8,bold:true,color:PC.gold,charSpacing:2,margin:0});
    const fkpis=[
      {l:"ROI annuel",v:`${roi.toFixed(0)}%`,col:roi>20?PC.green:PC.gold},
      {l:"Marge brute",v:`${marge.toFixed(0)}%`,col:marge>40?PC.green:PC.gold},
      {l:"CF mensuel",v:fmt(cfM,cur).replace(" "+cur,""),col:cfM>0?PC.green:PC.orange},
      {l:"Break-even",v:`M${Math.max(1,Math.ceil(payback))}`,col:PC.gold},
      {l:"ROI investisseur",v:ai.investor_roi||pitchMeta.roi||"8–15×",col:PC.green},
      {l:"Investissement",v:fmt(invest,cur).replace(" "+cur,""),col:PC.blue},
    ];
    fkpis.forEach((k,i)=>{
      const y=1.95+i*0.54;
      s.addShape("rect",{x:6.88,y,w:2.58,h:0.42,fill:{color:PC.bg3}});
      s.addText(k.l,{x:7.02,y:y+0.02,w:1.5,h:0.38,fontSize:9.5,color:PC.muted,valign:"middle",margin:0});
      s.addText(k.v,{x:7.02,y:y+0.02,w:2.3,h:0.38,fontSize:14,bold:true,color:k.col,fontFace:"Georgia",align:"right",valign:"middle",margin:0});
    });
  }

  // ── S7: COMPETITION ──
  {
    const s = newSlide(); pAddAccent(s);
    pChip(s,"06  AVANTAGE CONCURRENTIEL",0.55,0.15);
    s.addText("Pourquoi nous gagnons",{x:0.55,y:0.55,w:9,h:0.62,fontSize:28,bold:true,color:PC.white,fontFace:"Georgia",valign:"middle",margin:0});
    const comps=pitchMeta.comps||[
      {n:"Notre solution ✨",ai:true,local:true,fin:true,road:true,pitch:true,price:"Accessible"},
      {n:"Consultants",ai:false,local:false,fin:true,road:true,pitch:true,price:"$500–5K"},
      {n:"Outils génériques",ai:true,local:false,fin:false,road:false,pitch:false,price:"$99+/mois"},
      {n:"Banques",ai:false,local:true,fin:true,road:false,pitch:false,price:"Élevé"},
    ];
    const hdrs=["Solution","IA","Contextualisation","Financement","Roadmap","Pitch","Prix"];
    const cW=[2.05,0.85,1.55,1.2,1.15,0.85,1.0];
    const hRow=hdrs.map(h=>({text:h,options:{fill:{color:PC.bg3},color:PC.gold,bold:true,fontSize:8.5,align:"center",valign:"middle"}}));
    const dRows=comps.map((c,ri)=>{
      const isUs=ri===0;
      return[
        {text:c.n,options:{fill:{color:isUs?"1A2530":PC.bg2},color:isUs?PC.gold:PC.text,bold:isUs,fontSize:10,valign:"middle"}},
        ...[c.ai,c.local,c.fin,c.road,c.pitch].map(v=>({text:v?"✓":"✗",options:{fill:{color:isUs?"1A2530":PC.bg2},color:v?(isUs?PC.green:PC.muted):PC.orange,bold:true,fontSize:13,align:"center",valign:"middle"}})),
        {text:c.price,options:{fill:{color:isUs?"1A2530":PC.bg2},color:isUs?PC.green:PC.muted,fontSize:9,align:"center",valign:"middle"}},
      ];
    });
    s.addTable([hRow,...dRows],{x:0.55,y:1.38,w:9.1,h:2.9,colW:cW,border:{pt:0.5,color:PC.border},rowH:0.58});
    s.addText("NOS AVANTAGES DÉFENDABLES",{x:0.55,y:4.42,w:9,h:0.22,fontSize:8,bold:true,color:PC.gold,charSpacing:2,margin:0});
    const moats=[ai.moat1||"Données propriétaires financement Afrique",ai.moat2||"Modèles IA affinés sur PME locales",ai.moat3||"Partenariats bancaires & IMF exclusifs","Réseau 15 000+ entrepreneurs UEMOA"];
    const micons=["🔒","🧠","🤝","🌍"];
    moats.forEach((m,i)=>{
      const x=0.55+i*2.38;
      s.addShape("rect",{x,y:4.72,w:2.18,h:0.68,fill:{color:PC.bg2}});
      s.addText(`${micons[i]}  ${m}`,{x:x+0.1,y:4.72,w:2.0,h:0.68,fontSize:9.5,color:PC.text,lineSpacingMultiple:1.3,valign:"middle",margin:0});
    });
  }

  // ── S8: GO-TO-MARKET ──
  {
    const s = newSlide(); pAddAccent(s);
    pChip(s,"07  GO-TO-MARKET",0.55,0.15);
    s.addText("Plan de lancement en 3 phases",{x:0.55,y:0.55,w:9,h:0.62,fontSize:28,bold:true,color:PC.white,fontFace:"Georgia",valign:"middle",margin:0});
    const phases=[
      {l:"Phase 1",d:"0–6 mois",col:PC.blue,icon:"🎯",items:["500 utilisateurs beta","Partenariats 5 IMF","Product-market fit"]},
      {l:"Phase 2",d:"6–18 mois",col:PC.gold,icon:"📈",items:["10 000 utilisateurs","2 pays additionnels","Freemium → Premium"]},
      {l:"Phase 3",d:"18–36 mois",col:PC.green,icon:"🌍",items:["100K+ utilisateurs","6 pays Afrique Ouest","Licences bancaires B2B"]},
    ];
    phases.forEach((p,i)=>{
      const x=0.55+i*3.12;
      s.addShape("rect",{x,y:1.45,w:2.9,h:3.88,fill:{color:PC.bg2},shadow:mkCsh()});
      s.addShape("rect",{x,y:1.45,w:2.9,h:0.06,fill:{color:p.col}});
      s.addShape("ellipse",{x:x+1.1,y:1.68,w:0.7,h:0.7,fill:{color:p.col,transparency:82}});
      s.addText(p.icon,{x:x+1.1,y:1.68,w:0.7,h:0.7,fontSize:18,align:"center",valign:"middle",margin:0});
      s.addText(p.l,{x:x+0.1,y:2.5,w:2.7,h:0.32,fontSize:14,bold:true,color:p.col,align:"center",fontFace:"Georgia",margin:0});
      s.addText(p.d,{x:x+0.1,y:2.85,w:2.7,h:0.25,fontSize:10,color:PC.muted,align:"center",margin:0});
      p.items.forEach((item,j)=>s.addText([{text:"→  ",options:{color:p.col,bold:true}},{text:item,options:{color:PC.text}}],{x:x+0.18,y:3.24+j*0.55,w:2.6,h:0.45,fontSize:10,valign:"middle",margin:0}));
    });
    s.addText("CANAUX D'ACQUISITION",{x:0.55,y:5.42,w:9,h:0.18,fontSize:8,bold:true,color:PC.gold,charSpacing:2,margin:0});
    const chans=[ai.channel1||"Partenariats IMF/Banques",ai.channel2||"WhatsApp & Mobile-first","B2B Incubateurs","SEO Francophone"];
    chans.forEach((ch,i)=>{
      s.addShape("rect",{x:0.55+i*2.38,y:5.62,w:2.18,h:0.28,fill:{color:PC.bg3}});
      s.addShape("rect",{x:0.55+i*2.38,y:5.62,w:0.04,h:0.28,fill:{color:PC.gold}});
      s.addText(ch,{x:0.65+i*2.38,y:5.62,w:2.04,h:0.28,fontSize:9.5,color:PC.text,valign:"middle",margin:0});
    });
  }

  // ── S9: TEAM ──
  {
    const s = newSlide(); pAddAccent(s);
    pChip(s,"08  ÉQUIPE",0.55,0.15);
    s.addText("L'équipe qui va exécuter",{x:0.55,y:0.55,w:9,h:0.62,fontSize:28,bold:true,color:PC.white,fontFace:"Georgia",valign:"middle",margin:0});
    const team=pitchMeta.team||[
      {name:pitchMeta.founder||"Fondateur CEO",role:"Stratégie & Business",bg:"Expertise locale + Finance",emoji:"👤"},
      {name:"CTO / Tech Lead",role:"Produit & IA",bg:"Engineering + Machine Learning",emoji:"💻"},
      {name:"Head of Growth",role:"Commercial & Marketing",bg:"Fintech Africa",emoji:"📈"},
    ];
    team.forEach((m,i)=>{
      const x=0.55+i*3.12;
      s.addShape("rect",{x,y:1.45,w:2.9,h:3.02,fill:{color:PC.bg2},shadow:mkCsh()});
      s.addShape("ellipse",{x:x+0.95,y:1.65,w:1.0,h:1.0,fill:{color:PC.bg3}});
      s.addText(m.emoji,{x:x+0.95,y:1.65,w:1.0,h:1.0,fontSize:26,align:"center",valign:"middle",margin:0});
      s.addText(m.name,{x:x+0.1,y:2.8,w:2.7,h:0.32,fontSize:13,bold:true,color:PC.white,align:"center",margin:0});
      s.addText(m.role,{x:x+0.1,y:3.14,w:2.7,h:0.25,fontSize:10.5,color:PC.gold,align:"center",margin:0});
      s.addText(m.bg,{x:x+0.1,y:3.45,w:2.7,h:0.72,fontSize:9.5,color:PC.muted,align:"center",lineSpacingMultiple:1.35,margin:0});
    });
    s.addText("BOARD & ADVISORS",{x:0.55,y:4.65,w:9,h:0.22,fontSize:8,bold:true,color:PC.gold,charSpacing:2,margin:0});
    const advisors=pitchMeta.advisors||["Expert Financement Afrique","Partner Fonds d'Investissement","Expert Technologie IA","Entrepreneur Serial"];
    advisors.forEach((a,i)=>{
      const x=0.55+i*2.38;
      s.addShape("rect",{x,y:4.95,w:2.18,h:0.4,fill:{color:PC.bg2}});
      s.addText(`⭐  ${a}`,{x:x+0.12,y:4.95,w:2.0,h:0.4,fontSize:9.5,color:PC.text,valign:"middle",margin:0});
    });
  }

  // ── S10: USE OF FUNDS ──
  {
    const s = newSlide(); pAddAccent(s);
    pChip(s,"09  UTILISATION DES FONDS",0.55,0.15);
    s.addText("Notre demande d'investissement",{x:0.55,y:0.55,w:9,h:0.62,fontSize:28,bold:true,color:PC.white,fontFace:"Georgia",valign:"middle",margin:0});
    const raiseAmt=ai.raise_amount||pitchMeta.raise||"$500K";
    const valuation=ai.valuation||pitchMeta.valuation||"$2.5M pre-money";
    s.addShape("rect",{x:0.55,y:1.42,w:4.2,h:1.35,fill:{color:PC.bg2},shadow:mkCsh()});
    s.addShape("rect",{x:0.55,y:1.42,w:4.2,h:0.06,fill:{color:PC.gold}});
    s.addText("LEVÉE DE FONDS",{x:0.75,y:1.55,w:3.8,h:0.25,fontSize:8,bold:true,color:PC.gold,charSpacing:2,margin:0});
    s.addText(raiseAmt,{x:0.75,y:1.8,w:3.8,h:0.58,fontSize:40,bold:true,color:PC.white,fontFace:"Georgia",margin:0});
    s.addText(`SAFE / Equity  ·  ${valuation}`,{x:0.75,y:2.4,w:3.8,h:0.25,fontSize:9.5,color:PC.muted,margin:0});
    const fundUse=pitchMeta.fundUse||[{n:"Produit & Tech",p:40},{n:"Growth",p:30},{n:"Équipe",p:20},{n:"Opérations",p:10}];
    s.addChart("pie",[{name:"Fonds",labels:fundUse.map(f=>`${f.n} (${f.p}%)`),values:fundUse.map(f=>f.p)}],{
      x:0.55,y:2.9,w:4.2,h:2.5,
      chartColors:[PC.gold,PC.orange,PC.blue,PC.green],
      chartArea:{fill:{color:PC.bg2}},showPercent:false,showValue:false,
      legendPos:"b",showLegend:true,legendFontSize:9,legendColor:PC.text,
    });
    s.addShape("rect",{x:5.05,y:1.42,w:4.55,h:4.0,fill:{color:PC.bg2},shadow:mkCsh()});
    s.addText("CE QUE VOUS OBTENEZ",{x:5.25,y:1.58,w:4.15,h:0.22,fontSize:8,bold:true,color:PC.gold,charSpacing:2,margin:0});
    const rets=[
      {icon:"📈",t:`${ai.investor_roi||pitchMeta.roi||"8–15×"} retour estimé`,d:"Horizon 5–7 ans, scenario conservateur"},
      {icon:"🌍",t:"Marché sous-pénétré",d:"First-mover advantage Africa"},
      {icon:"🤝",t:"Board seat disponible",d:"Pour lead investor (>$250K)"},
      {icon:"📊",t:"Reporting trimestriel",d:"Données temps réel, dashboard"},
      {icon:"🔒",t:"Protection anti-dilution",d:"Clauses standards SAFE / term sheet"},
    ];
    rets.forEach((r,i)=>{
      const y=2.0+i*0.68;
      s.addShape("ellipse",{x:5.22,y:y+0.06,w:0.46,h:0.46,fill:{color:PC.gold,transparency:82}});
      s.addText(r.icon,{x:5.22,y:y+0.06,w:0.46,h:0.46,fontSize:14,align:"center",valign:"middle",margin:0});
      s.addText(r.t,{x:5.82,y:y+0.04,w:3.55,h:0.26,fontSize:11,bold:true,color:PC.white,valign:"middle",margin:0});
      s.addText(r.d,{x:5.82,y:y+0.3,w:3.55,h:0.26,fontSize:9.5,color:PC.muted,valign:"middle",margin:0});
    });
  }

  // ── S11: TRACTION ──
  {
    const s = newSlide(); pAddAccent(s);
    pChip(s,"10  TRACTION & PREUVES",0.55,0.15);
    s.addText("Ce que nous avons déjà accompli",{x:0.55,y:0.55,w:9,h:0.62,fontSize:28,bold:true,color:PC.white,fontFace:"Georgia",valign:"middle",margin:0});
    const kpis=pitchMeta.kpis||[
      {v:pitchMeta.users||"—",l:"UTILISATEURS",s:"actifs",col:PC.gold},
      {v:pitchMeta.revenue||"—",l:"ARR",s:"annuel récurrent",col:PC.green},
      {v:pitchMeta.growth||"—",l:"CROISSANCE",s:"mensuelle",col:PC.blue},
      {v:pitchMeta.nps||"—",l:"NPS SCORE",s:"satisfaction",col:PC.orange},
    ];
    kpis.forEach((k,i)=>pStat(s,0.55+i*2.38,1.38,2.15,1.55,k.v,k.l,k.col,k.s));
    const months=["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû"];
    const gData=pitchMeta.growthData||[12,28,45,72,110,165,210,290];
    s.addChart("line",[{name:"Utilisateurs",labels:months,values:gData}],{
      x:0.55,y:3.12,w:5.8,h:2.3,
      chartColors:[PC.gold],lineSize:3,lineSmooth:true,
      chartArea:{fill:{color:PC.bg2}},
      catAxisLabelColor:PC.muted,valAxisLabelColor:PC.muted,
      valGridLine:{color:PC.border,size:0.5},catGridLine:{style:"none"},
      showLegend:false,
    });
    s.addShape("rect",{x:6.7,y:3.12,w:2.95,h:2.3,fill:{color:PC.bg2},shadow:mkCsh()});
    s.addText("JALONS CLÉS",{x:6.86,y:3.25,w:2.64,h:0.22,fontSize:8,bold:true,color:PC.gold,charSpacing:2,margin:0});
    const miles=pitchMeta.milestones||[{d:"M+1",t:"MVP lancé"},{d:"M+3",t:"100 premiers users"},{d:"M+6",t:"1er partenariat banque"},{d:"M+9",t:"Break-even atteint"}];
    miles.forEach((m,i)=>{
      const y=3.58+i*0.42;
      s.addShape("ellipse",{x:6.86,y:y+0.04,w:0.3,h:0.3,fill:{color:PC.gold}});
      s.addText("✓",{x:6.86,y:y+0.04,w:0.3,h:0.3,fontSize:9,bold:true,color:PC.bg,align:"center",valign:"middle",margin:0});
      s.addText(m.d,{x:7.24,y,w:0.55,h:0.32,fontSize:8.5,bold:true,color:PC.gold,valign:"middle",margin:0});
      s.addText(m.t,{x:7.83,y,w:1.68,h:0.32,fontSize:9.5,color:PC.text,valign:"middle",margin:0});
    });
  }

  // ── S12: RISKS ──
  {
    const s = newSlide(); pAddAccent(s);
    pChip(s,"11  RISQUES & MITIGATIONS",0.55,0.15);
    s.addText("Nous avons anticipé les obstacles",{x:0.55,y:0.55,w:9,h:0.62,fontSize:28,bold:true,color:PC.white,fontFace:"Georgia",valign:"middle",margin:0});
    const risks=[
      {risk:"Concurrence internationale",mit:ai.risk1||"Focus Africa-first, localisation profonde, partenariats exclusifs",prob:65,imp:45},
      {risk:"Adoption digitale lente",mit:ai.risk2||"Mobile-first, WhatsApp Business, agents terrain, offline mode",prob:50,imp:55},
      {risk:"Régulation fintech",mit:"Modèle SaaS pur, partenariats institutionnels locaux",prob:30,imp:70},
      {risk:"Rétention utilisateurs",mit:"Onboarding structuré, customer success dédié, NPS tracking",prob:45,imp:60},
    ];
    risks.forEach((r,i)=>{
      const y=1.45+i*0.98;
      const pc=r.prob>60?PC.orange:r.prob>40?PC.gold:PC.green;
      const ic=r.imp>60?PC.orange:r.imp>40?PC.gold:PC.green;
      s.addShape("rect",{x:0.55,y,w:9.1,h:0.86,fill:{color:PC.bg2},shadow:mkCsh()});
      s.addText(r.risk,{x:0.72,y:y+0.08,w:3.8,h:0.32,fontSize:11,bold:true,color:PC.white,valign:"middle",margin:0});
      s.addText("→  "+r.mit,{x:0.72,y:y+0.44,w:5.1,h:0.3,fontSize:9.5,color:PC.muted,valign:"top",margin:0});
      s.addText("Prob.",{x:5.95,y:y+0.1,w:0.6,h:0.25,fontSize:8,color:PC.muted,valign:"middle",margin:0});
      s.addShape("rect",{x:6.55,y:y+0.16,w:2.9,h:0.12,fill:{color:PC.bg3}});
      s.addShape("rect",{x:6.55,y:y+0.16,w:2.9*r.prob/100,h:0.12,fill:{color:pc}});
      s.addText(`${r.prob}%`,{x:9.5,y:y+0.1,w:0.35,h:0.25,fontSize:8,color:pc,bold:true,margin:0});
      s.addText("Impact",{x:5.95,y:y+0.5,w:0.65,h:0.25,fontSize:8,color:PC.muted,valign:"middle",margin:0});
      s.addShape("rect",{x:6.55,y:y+0.56,w:2.9,h:0.12,fill:{color:PC.bg3}});
      s.addShape("rect",{x:6.55,y:y+0.56,w:2.9*r.imp/100,h:0.12,fill:{color:ic}});
      s.addText(`${r.imp}%`,{x:9.5,y:y+0.5,w:0.35,h:0.25,fontSize:8,color:ic,bold:true,margin:0});
    });
  }

  // ── S13: CLOSING ──
  {
    const s = newSlide();
    s.addShape("rect",{x:0,y:3.15,w:10,h:2.475,fill:{color:"0D1117"}});
    s.addShape("rect",{x:0,y:3.15,w:0.06,h:2.475,fill:{color:PC.gold}});
    s.addText("Rejoignez la révolution\nentrepreneuriale africaine.",{x:0.7,y:0.5,w:8.6,h:2.55,fontSize:42,bold:true,color:PC.white,fontFace:"Georgia",lineSpacingMultiple:1.15,valign:"top",margin:0});
    s.addText(ai.closing_tagline||pitchMeta.closingTagline||"— L'IA qui transforme les idées en entreprises prospères.",{x:0.7,y:3.06,w:8.6,h:0.38,fontSize:15,color:PC.gold,italic:true,valign:"middle",margin:0});
    const ctas=[["📧","Email",pitchMeta.email||"contact@filano.io"],["🌐","Site",pitchMeta.website||"www.filano.io"],["📞","Tel",pitchMeta.phone||"+229 XX XX XX XX"]];
    ctas.forEach(([icon,lbl,val],i)=>{
      const x=0.7+i*3.05;
      s.addShape("rect",{x,y:3.7,w:2.8,h:0.75,fill:{color:PC.bg2}});
      s.addText(`${icon}  ${lbl}: ${val}`,{x:x+0.15,y:3.7,w:2.55,h:0.75,fontSize:11,color:PC.text,valign:"middle",margin:0});
    });
    s.addShape("rect",{x:0,y:5.28,w:10,h:0.345,fill:{color:"080A0D"}});
    s.addText(`${pitchMeta.company||"Filano"}  ·  Pitch Deck Investisseurs  ·  Confidentiel  ·  ${new Date().getFullYear()}`,{x:0.5,y:5.28,w:9,h:0.345,fontSize:8.5,color:PC.muted,align:"center",valign:"middle",margin:0});
    s.addShape("rect",{x:0,y:5.58,w:10,h:0.045,fill:{color:PC.gold}});
    s.addShape("rect",{x:4.5,y:5.58,w:5.5,h:0.045,fill:{color:PC.orange}});
  }

  setStatus("💾 Finalisation du fichier...");
  const fname = `PitchDeck_${(pitchMeta.company||data.type_projet||"Filano").replace(/[\s\/]/g,"_")}_${new Date().toISOString().split("T")[0]}.pptx`;
  await pres.writeFile({ fileName: fname });
  setStatus(null);
}

// ── PITCH MODAL ──────────────────────────────────────────────
function PitchModal({ data, uploadedDoc, onClose, onGenerate, pitchStatus }) {
  const [meta, setMeta] = useState({
    company: data.type_projet?.split(" / ")[0] || "",
    tagline: "",
    raise: "",
    valuation: "",
    email: "",
    website: "",
    phone: "",
    founder: "",
  });
  const up = (k, v) => setMeta(prev => ({ ...prev, [k]: v }));
  const isBusy = !!pitchStatus;

  const steps = [
    "📦 Chargement de la librairie...",
    "🧠 Enrichissement IA du contenu...",
    "🎨 Construction des slides...",
    "💾 Finalisation du fichier...",
  ];
  const stepIdx = steps.indexOf(pitchStatus);

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"#111419", border:"1px solid #252b38", borderRadius:18, width:"100%", maxWidth:560, maxHeight:"90vh", overflowY:"auto", display:"flex", flexDirection:"column" }}>
        {/* Header */}
        <div style={{ padding:"20px 24px 16px", borderBottom:"1px solid #252b38" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontFamily:"Georgia, serif", fontSize:18, fontWeight:700 }}>🎯 Générer le Pitch Deck</div>
              <div style={{ fontSize:11, color:"#7a8299", marginTop:3 }}>Présentation investisseurs de classe mondiale • 13 slides professionnelles</div>
            </div>
            {!isBusy && <button onClick={onClose} style={{ background:"transparent", border:"1px solid #252b38", borderRadius:7, color:"#7a8299", fontSize:13, cursor:"pointer", padding:"4px 10px", fontFamily:"inherit" }}>✕</button>}
          </div>
        </div>

        {/* Progress (when generating) */}
        {isBusy && (
          <div style={{ padding:"24px", display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
            <div style={{ width:52, height:52, borderRadius:"50%", border:`3px solid ${steps.indexOf(pitchStatus)>=0?"#f0a500":"#252b38"}`, borderTopColor:"transparent", animation:"spin 0.8s linear infinite" }} />
            <div style={{ fontSize:14, fontWeight:600, color:"#f0a500" }}>{pitchStatus}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:6, width:"100%" }}>
              {steps.map((st, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:16, height:16, borderRadius:"50%", background: i < stepIdx ? "#2ecc8a" : i === stepIdx ? "#f0a500" : "#252b38", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color: i <= stepIdx ? "#000":"#7a8299", fontWeight:700, flexShrink:0 }}>
                    {i < stepIdx ? "✓" : i === stepIdx ? "●" : "○"}
                  </div>
                  <div style={{ fontSize:11, color: i <= stepIdx ? "#e8eaf0" : "#3d4560" }}>{st}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:10, color:"#7a8299", textAlign:"center", lineHeight:1.6 }}>Génération IA + 13 slides avec graphiques<br/>Patientez 20–40 secondes...</div>
          </div>
        )}

        {/* Form */}
        {!isBusy && (
          <>
            <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:14 }}>
              {/* Pitch quality badge */}
              <div style={{ background:"linear-gradient(135deg,rgba(240,165,0,0.08),rgba(224,92,42,0.05))", border:"1px solid rgba(240,165,0,0.22)", borderRadius:11, padding:"12px 16px" }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#f0a500", marginBottom:6 }}>⭐ Qualité YC / I&P / Partech</div>
                <div style={{ fontSize:10, color:"#a0a8c0", lineHeight:1.65 }}>
                  13 slides • Graphiques financiers • TAM/SAM/SOM • Tableau concurrentiel • Utilisation des fonds • Matrice de risques • Design dark premium
                </div>
              </div>

              {/* Fields */}
              {[
                { k:"company", label:"Nom de l'entreprise / projet *", placeholder:`ex: ${data.type_projet?.split(" / ")[0] || "MonStartup"}` },
                { k:"tagline", label:"Tagline (optionnel — l'IA en génère un)", placeholder:"ex: L'IA qui finance les PME africaines" },
                { k:"raise", label:"Montant de la levée (optionnel)", placeholder:"ex: $500K, 300 000€, 200M FCFA" },
                { k:"valuation", label:"Valorisation pre-money (optionnel)", placeholder:"ex: $2M, 1.5M€" },
                { k:"founder", label:"Nom du fondateur / CEO (optionnel)", placeholder:"ex: Kofi Mensah" },
                { k:"email", label:"Email de contact (optionnel)", placeholder:"contact@startup.io" },
                { k:"website", label:"Site web (optionnel)", placeholder:"www.startup.io" },
                { k:"phone", label:"Téléphone (optionnel)", placeholder:"+229 XX XX XX XX" },
              ].map(f => (
                <div key={f.k}>
                  <div style={{ fontSize:10, color:"#7a8299", marginBottom:5, fontWeight:600 }}>{f.label}</div>
                  <input
                    value={meta[f.k]}
                    onChange={e => up(f.k, e.target.value)}
                    placeholder={f.placeholder}
                    style={{ width:"100%", padding:"9px 13px", background:"#181c24", border:"1px solid #252b38", borderRadius:8, color:"#e8eaf0", fontFamily:"inherit", fontSize:12, outline:"none", boxSizing:"border-box" }}
                    onFocus={e => e.target.style.borderColor="#f0a500"}
                    onBlur={e => e.target.style.borderColor="#252b38"}
                  />
                </div>
              ))}

              {/* Slides preview */}
              <div style={{ background:"#181c24", borderRadius:10, padding:"12px 14px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:"#7a8299", marginBottom:8, textTransform:"uppercase", letterSpacing:1 }}>📑 Contenu des 13 slides</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 12px" }}>
                  {["01 · Couverture & Identité","02 · Problème (×3 pain points)","03 · Solution & Fonctionnalités","04 · Opportunité de marché (TAM/SAM/SOM)","05 · Business Model & Revenus","06 · Projections financières + graphiques","07 · Avantage concurrentiel","08 · Go-to-Market 3 phases","09 · Équipe & Advisors","10 · Utilisation des fonds","11 · Traction & Jalons clés","12 · Risques & Mitigations","13 · Closing & Contact"].map((sl, i) => (
                    <div key={i} style={{ fontSize:9, color:"#7a8299", padding:"2px 0" }}>
                      <span style={{ color:"#f0a500" }}>●</span> {sl}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding:"0 24px 24px", display:"flex", gap:10 }}>
              <button onClick={onClose} style={{ flex:1, padding:"11px", background:"transparent", border:"1px solid #252b38", borderRadius:10, color:"#7a8299", fontFamily:"inherit", fontSize:12, cursor:"pointer" }}>Annuler</button>
              <button onClick={() => onGenerate(meta)} style={{ flex:2, padding:"11px", background:"linear-gradient(135deg,#f0a500,#e05c2a)", border:"none", borderRadius:10, color:"#000", fontFamily:"inherit", fontSize:13, fontWeight:700, cursor:"pointer" }}>
                🚀 Générer le Pitch Deck (.pptx)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// RESULTS
// ══════════════════════════════════════════════════════════
function Results({ data, uploadedDoc, onRestart, onDownload, dlStatus, onPitch, pitchStatus }) {
  const [tab, setTab] = useState("financial");
  const [showPitchModal, setShowPitchModal] = useState(false);
  const { invest, revM, charges, cfM, cfA, roi, payback, marge, yearsC, cur } = calcFin(data);
  const verdict = roi > 30 ? { icon: "🟢", label: "Projet très prometteur !", color: "#2ecc8a", text: `ROI estimé ${roi.toFixed(0)}%, retour sur investissement en ${Math.ceil(payback)} mois. Constituez une réserve de 3 mois de charges (${fmt(charges * 3, cur)}).` }
    : roi > 8 ? { icon: "🟡", label: "Projet viable — rigueur requise", color: "#f0a500", text: `ROI estimé ${roi.toFixed(0)}%, retour en ${Math.ceil(payback)} mois. Réduisez les charges de 10–15% et testez à petite échelle.` }
    : { icon: "🔴", label: "Attention — risqué en l'état", color: "#e05c2a", text: `ROI estimé ${roi.toFixed(0)}%. Revoyez votre prix, réduisez les coûts ou ajoutez des revenus complémentaires.` };
  const Tb = id => ({ fontSize: 11, cursor: "pointer", padding: "7px 12px", borderRadius: 14, border: "1px solid", fontFamily: "inherit", fontWeight: tab === id ? 700 : 400, borderColor: tab === id ? "#f0a500" : "#252b38", background: tab === id ? "rgba(240,165,0,0.12)" : "#111419", color: tab === id ? "#f0a500" : "#7a8299" });
  return (
    <div style={{ padding: "18px 20px", overflowY: "auto", height: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, marginBottom: 3 }}>🏁 Analyse Complète</div>
        <div style={{ fontSize: 11, color: "#7a8299" }}>
          Projet : <span style={{ color: "#f0a500", fontWeight: 700 }}>{data.type_projet}</span>
          {" · "}Zone : <span style={{ color: "#4a9eff", fontWeight: 600 }}>{data.zone_geo}</span>
          {uploadedDoc && <span style={{ marginLeft: 8, background: "rgba(46,204,138,0.12)", color: "#2ecc8a", padding: "1px 8px", borderRadius: 8, fontSize: 10, fontWeight: 700 }}>✅ Enrichi</span>}
        </div>
      </div>

      {/* Tab buttons */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <button onClick={() => setTab("financial")} style={Tb("financial")}>📊 Finances</button>
        <button onClick={() => setTab("etats")} style={Tb("etats")}>📋 États Financiers</button>
        <button onClick={() => setTab("roadmap")} style={Tb("roadmap")}>🗺️ Roadmap</button>
        <button onClick={() => setTab("financing")} style={Tb("financing")}>💰 Financement</button>
        {uploadedDoc && <button onClick={() => setTab("document")} style={Tb("document")}>📄 Document</button>}
      </div>

      {/* ── FINANCIAL ── */}
      {tab === "financial" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {uploadedDoc && (uploadedDoc.points_forts || uploadedDoc.points_amelioration) && (
            <div style={{ background: "linear-gradient(135deg,rgba(46,204,138,0.06),rgba(74,158,255,0.04))", border: "1px solid rgba(46,204,138,0.2)", borderRadius: 10, padding: 13 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2ecc8a", marginBottom: 7 }}>📄 Insights — {uploadedDoc._fileName}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {uploadedDoc.points_forts && <div style={{ background: "rgba(46,204,138,0.06)", borderRadius: 8, padding: "9px 11px" }}><div style={{ fontSize: 9, color: "#2ecc8a", fontWeight: 700, marginBottom: 3 }}>✅ POINTS FORTS</div><div style={{ fontSize: 10, color: "#a8e6c8", lineHeight: 1.6 }}>{uploadedDoc.points_forts.substring(0, 180)}</div></div>}
                {uploadedDoc.points_amelioration && <div style={{ background: "rgba(240,165,0,0.06)", borderRadius: 8, padding: "9px 11px" }}><div style={{ fontSize: 9, color: "#f0a500", fontWeight: 700, marginBottom: 3 }}>💡 À AMÉLIORER</div><div style={{ fontSize: 10, color: "#f5d78a", lineHeight: 1.6 }}>{uploadedDoc.points_amelioration.substring(0, 180)}</div></div>}
              </div>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9 }}>
            {[{ l: "Cash-Flow Mensuel", v: fmt(cfM, cur), c: cfM >= 0 ? "#2ecc8a" : "#e05c2a" }, { l: "ROI Annuel", v: `${roi.toFixed(1)}%`, c: roi > 15 ? "#2ecc8a" : roi > 0 ? "#f0a500" : "#e05c2a" }, { l: "Retour capital", v: `${payback > 99 ? "99+" : Math.ceil(payback)} mois`, c: "#f0a500" }, { l: "Marge Brute", v: `${marge.toFixed(1)}%`, c: "#f0a500" }, { l: "Investissement", v: fmt(invest, cur), c: "#f0a500" }, { l: "CF Annuel", v: fmt(cfA, cur), c: cfA >= 0 ? "#2ecc8a" : "#e05c2a" }].map((k, i) => (
              <div key={i} style={{ background: "#111419", border: "1px solid #252b38", borderRadius: 10, padding: "11px 10px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#f0a500,#e05c2a)" }} />
                <div style={{ fontSize: 9, color: "#7a8299", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{k.l}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: k.c }}>{k.v}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#111419", border: "1px solid #252b38", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "9px 14px", background: "#181c24", borderBottom: "1px solid #252b38", fontSize: 11, fontWeight: 700 }}>📅 Projection 5 ans</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
              <thead><tr>{["Année","CA estimé","Charges","Cash-Flow","Cumulatif"].map(h => <th key={h} style={{ padding: "6px 12px", textAlign: "left", color: "#7a8299", fontSize: 8, textTransform: "uppercase", letterSpacing: 1, background: "#181c24", borderBottom: "1px solid #252b38" }}>{h}</th>)}</tr></thead>
              <tbody>{yearsC.map(r => <tr key={r.y} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}><td style={{ padding: "6px 12px", fontWeight: 700 }}>An {r.y}</td><td style={{ padding: "6px 12px" }}>{fmt(r.rev, cur)}</td><td style={{ padding: "6px 12px", color: "#e05c2a" }}>{fmt(r.ch, cur)}</td><td style={{ padding: "6px 12px", color: r.cf >= 0 ? "#2ecc8a" : "#e05c2a", fontWeight: 700 }}>{fmt(r.cf, cur)}</td><td style={{ padding: "6px 12px", color: r.cum >= 0 ? "#2ecc8a" : "#e05c2a", fontWeight: 700 }}>{fmt(r.cum, cur)}</td></tr>)}</tbody>
            </table>
          </div>
          <div style={{ background: "#111419", border: "1px solid #252b38", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "9px 14px", background: "#181c24", borderBottom: "1px solid #252b38", fontSize: 11, fontWeight: 700 }}>🎯 3 Scénarios</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
              <thead><tr>{["Scénario","CF/mois","CF/an"].map(h => <th key={h} style={{ padding: "6px 12px", textAlign: "left", color: "#7a8299", fontSize: 8, textTransform: "uppercase", letterSpacing: 1, background: "#181c24", borderBottom: "1px solid #252b38" }}>{h}</th>)}</tr></thead>
              <tbody>{[{l:"🚀 Optimiste (+30%)",m:cfM*1.3},{l:"⚖️ Réaliste",m:cfM},{l:"⚠️ Pessimiste (-50%)",m:cfM*0.5}].map((s,i)=><tr key={i} style={{borderBottom:"1px solid rgba(255,255,255,0.04)"}}><td style={{padding:"6px 12px",fontWeight:700}}>{s.l}</td><td style={{padding:"6px 12px",color:s.m>=0?"#2ecc8a":"#e05c2a",fontWeight:700}}>{fmt(s.m,cur)}</td><td style={{padding:"6px 12px",color:s.m>=0?"#2ecc8a":"#e05c2a",fontWeight:700}}>{fmt(s.m*12,cur)}</td></tr>)}</tbody>
            </table>
          </div>
          <div style={{ background: "linear-gradient(135deg,rgba(240,165,0,0.08),rgba(224,92,42,0.05))", border: "1px solid rgba(240,165,0,0.22)", borderRadius: 10, padding: 15 }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 13, color: verdict.color, marginBottom: 5, fontWeight: 700 }}>{verdict.icon} {verdict.label}</div>
            <p style={{ fontSize: 11, lineHeight: 1.75, margin: 0 }}>{verdict.text}</p>
          </div>
        </div>
      )}

      {/* ── ÉTATS FINANCIERS ── */}
      {tab === "etats" && <FinancialStatementsTab data={data} />}

      {/* ── ROADMAP & STRATEGY ── */}
      {tab === "roadmap" && <RoadmapTab data={data} />}

      {/* ── FINANCING ── */}
      {tab === "financing" && <FinancingTab data={data} />}

      {/* ── DOCUMENT ── */}
      {tab === "document" && uploadedDoc && (
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          <div style={{ background: "#111419", border: "1px solid #252b38", borderRadius: 11, padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#2ecc8a", marginBottom: 10 }}>📄 {uploadedDoc._fileName}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 11 }}>
              {[{ l: "Taille", v: uploadedDoc._fileSize }, { l: "Format", v: uploadedDoc._fileType }, { l: "Secteur détecté", v: uploadedDoc.type_projet || "Non précisé" }, { l: "Zone détectée", v: uploadedDoc.zone_geo || "Non précisée" }].map((k, i) => (
                <div key={i} style={{ background: "#181c24", borderRadius: 8, padding: "8px 11px" }}>
                  <div style={{ fontSize: 9, color: "#7a8299", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{k.l}</div>
                  <div style={{ fontSize: 11 }}>{k.v}</div>
                </div>
              ))}
            </div>
            {uploadedDoc.resume_document && <div style={{ background: "rgba(240,165,0,0.06)", border: "1px solid rgba(240,165,0,0.15)", borderRadius: 9, padding: "11px 13px", marginBottom: 9 }}><div style={{ fontSize: 10, color: "#f0a500", fontWeight: 700, marginBottom: 4 }}>📋 RÉSUMÉ</div><div style={{ fontSize: 11, lineHeight: 1.7 }}>{uploadedDoc.resume_document}</div></div>}
            {uploadedDoc.donnees_financieres_brutes && <div style={{ background: "rgba(74,158,255,0.05)", border: "1px solid rgba(74,158,255,0.15)", borderRadius: 9, padding: "11px 13px", marginBottom: 9 }}><div style={{ fontSize: 10, color: "#4a9eff", fontWeight: 700, marginBottom: 4 }}>💰 DONNÉES FINANCIÈRES</div><div style={{ fontSize: 11, lineHeight: 1.7 }}>{uploadedDoc.donnees_financieres_brutes}</div></div>}
            {[["✅ Points forts", uploadedDoc.points_forts, "#2ecc8a", "rgba(46,204,138,0.05)"], ["💡 À améliorer", uploadedDoc.points_amelioration, "#f0a500", "rgba(240,165,0,0.05)"]].map(([lbl, val, color, bg], i) => val && (
              <div key={i} style={{ background: bg, border: `1px solid ${color}33`, borderRadius: 9, padding: "11px 13px", marginBottom: 8 }}>
                <div style={{ fontSize: 10, color, fontWeight: 700, marginBottom: 4 }}>{lbl}</div>
                <div style={{ fontSize: 11, lineHeight: 1.7 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PITCH MODAL */}
      {showPitchModal && (
        <PitchModal
          data={data}
          uploadedDoc={uploadedDoc}
          onClose={() => !pitchStatus && setShowPitchModal(false)}
          onGenerate={(meta) => onPitch(meta, () => setShowPitchModal(false))}
          pitchStatus={pitchStatus}
        />
      )}

      {/* DOWNLOAD */}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {/* PITCH DECK — Primary CTA */}
        <div style={{ background:"linear-gradient(135deg,rgba(240,165,0,0.1),rgba(224,92,42,0.07))", border:"1px solid rgba(240,165,0,0.35)", borderRadius:13, padding:16, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#f0a500,#e05c2a)" }} />
          <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
            <div style={{ fontSize:28, flexShrink:0 }}>🎯</div>
            <div>
              <div style={{ fontFamily:"Georgia, serif", fontSize:14, fontWeight:700, color:"#f0a500", marginBottom:3 }}>
                Pitch Deck Investisseurs
              </div>
              <div style={{ fontSize:10, color:"#a0a8c0", lineHeight:1.6 }}>
                13 slides • Design premium dark • Graphiques financiers • TAM/SAM/SOM • Qualité YC / I&P / Partech
              </div>
            </div>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:12 }}>
            {["📊 Projections 5 ans","🏆 Tableau concurrentiel","💰 Use of funds","⚠️ Matrice risques","🌍 Go-to-Market"].map(f => (
              <span key={f} style={{ background:"rgba(240,165,0,0.1)", border:"1px solid rgba(240,165,0,0.2)", borderRadius:7, padding:"2px 9px", fontSize:9, color:"#f0a500" }}>{f}</span>
            ))}
          </div>
          <button
            onClick={() => setShowPitchModal(true)}
            disabled={!!pitchStatus}
            style={{ width:"100%", padding:"12px 20px", background: pitchStatus ? "#252b38" : "linear-gradient(135deg,#f0a500,#e05c2a)", border:"none", borderRadius:9, color: pitchStatus ? "#7a8299" : "#000", fontFamily:"inherit", fontSize:13, fontWeight:700, cursor: pitchStatus ? "not-allowed" : "pointer" }}
          >
            {pitchStatus || "🚀 Générer le Pitch Deck (.pptx)"}
          </button>
        </div>

        {/* BUSINESS PLAN — Secondary CTA */}
        <div style={{ background:"linear-gradient(135deg,rgba(46,204,138,0.06),rgba(74,158,255,0.03))", border:"1px solid rgba(46,204,138,0.22)", borderRadius:11, padding:14 }}>
          <div style={{ fontFamily:"Georgia, serif", fontSize:13, fontWeight:700, color:"#2ecc8a", marginBottom:4 }}>
            📄 Business Plan (.txt)
            {uploadedDoc && <span style={{ fontSize:10, marginLeft:8, color:"#f0a500", fontWeight:600 }}>+ Document analysé</span>}
          </div>
          <div style={{ fontSize:10, color:"#a0a8c0", lineHeight:1.6, marginBottom:10 }}>Finances, roadmap, stratégies, financement 2025, plan d'action complet.</div>
          <button onClick={onDownload} disabled={!!dlStatus} style={{ padding:"9px 18px", background: dlStatus ? "#252b38" : "#111419", border:`1px solid ${dlStatus ? "#252b38" : "rgba(46,204,138,0.35)"}`, borderRadius:8, color: dlStatus ? "#7a8299" : "#2ecc8a", fontFamily:"inherit", fontSize:11, fontWeight:700, cursor: dlStatus ? "not-allowed" : "pointer", width:"100%" }}>
            {dlStatus || "⬇️ Télécharger le Business Plan (.txt)"}
          </button>
        </div>
      </div>
      <button onClick={onRestart} style={{ alignSelf: "flex-start", padding: "7px 16px", background: "#111419", border: "1px solid #252b38", borderRadius: 8, color: "#e8eaf0", cursor: "pointer", fontSize: 11, fontFamily: "inherit" }}>🔄 Nouveau projet</button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// STEPS
// ══════════════════════════════════════════════════════════
const STEPS_LIST = [
  { l: "Type de projet", icon: "🏢" }, { l: "Présentation", icon: "📝" },
  { l: "Zone géo.", icon: "🌍" }, { l: "Marché", icon: "👥" },
  { l: "Investissement", icon: "💰" }, { l: "Revenus", icon: "📈" },
  { l: "Charges", icon: "📉" }, { l: "Financement", icon: "🏦" },
  { l: "Risques", icon: "⚠️" }, { l: "Fiscal & Juridique", icon: "⚖️" }, { l: "Résultats", icon: "🏁" },
];
const QS = [
  { key: "type_projet", msg: `Bonjour ! Je suis **Filano**, votre analyste business IA. 👋\n\nJe vous accompagne pour :\n✅ Évaluer la viabilité financière de votre projet\n✅ Identifier les meilleures opportunités de financement (données 2025)\n✅ Construire votre roadmap et stratégies de lancement\n✅ Générer un business plan professionnel\n\n**Quel type de projet souhaitez-vous lancer ?**`, chips: ["Commerce / Boutique", "Restaurant / Alimentation", "Service & Consulting", "Agriculture / Élevage", "Import-Export", "BTP / Construction", "Tech / Application", "Santé / Pharma", "Éducation / Formation", "Autre"] },
  { key: "presentation", msg: `Décrivez votre projet.\n\n• **Quoi** : Que vendez-vous ?\n• **À qui** : Vos clients cibles ?\n• **Pourquoi** : Votre avantage concurrentiel ?\n• **Où** : Ville / Région de lancement ?`, tip: "Un investisseur veut comprendre en 2 min : QUI vous êtes, QUOI vous vendez, POURQUOI quelqu'un paierait pour ça." },
  { key: "zone_geo", msg: `Pour adapter les recommandations à votre réalité locale, **dans quelle zone économique vous situez-vous ?**`, tip: "Les conditions varient énormément : taux, montants, programmes disponibles.", chips: Object.keys(ZONES) },
  { key: "marche_clients", msg: `**Marché & clients** :\n\n**1.** Qui sont vos clients ? (âge, revenus, localisation)\n**2.** Combien de clients le 1er mois ? À 6 mois ?\n**3.** Concurrents ? Votre avantage ?\n**4.** Avez-vous déjà testé l'idée ?`, tip: "Connaître son marché réduit le risque d'échec de 50%." },
  { key: "investissement_initial", msg: `**Investissement de départ** :\n\n**1.** Montant total pour démarrer ?\n**2.** À quoi va servir cet argent ?\n**3.** Combien avez-vous personnellement ?`, tip: "Beaucoup sous-estiment le BFR (Besoin en Fonds de Roulement) — c'est là que les projets s'effondrent." },
  { key: "revenus_ventes", msg: `**Revenus** :\n\n**1.** Prix de vente de votre produit / service ?\n**2.** Nombre d'unités / clients / commandes par mois ?\n**3.** Autres sources de revenus prévues ?\n**4.** Saisonnalité ?`, tip: "Soyez conservateur. Je calculerai 3 scénarios (optimiste / réaliste / pessimiste)." },
  { key: "charges_couts", msg: `**Charges mensuelles** :\n\n**1.** Loyer ?\n**2.** Salaires ?\n**3.** Matières premières / marchandises ?\n**4.** Énergie, internet, transport ?\n**5.** Marketing mensuel ?\n**6.** Autres ?`, tip: "Charges fixes vs variables = seuil de rentabilité, le KPI numéro 1 des banquiers." },
  { key: "financement", msg: `**Financement** :\n\n**1.** Comment financer le projet ?\n**2.** Apport personnel ?\n**3.** Si prêt : montant, taux, durée ?\n**4.** Garanties disponibles ?`, tip: "Structure idéale : 25–30% fonds propres + 70–75% externe. FAGACE peut garantir 50% de votre prêt.", chips: ["Épargne personnelle", "Famille / Tontine", "Microfinance / IMF", "Prêt bancaire", "Business Angel", "Subvention / Programme", "Mix de sources"] },
  { key: "risques", msg: `**Risques** :\n\n**1.** Les 3 plus grands risques ?\n**2.** Votre expérience dans ce secteur ?\n**3.** Si ventes -50% les 3 premiers mois ?\n**4.** Un Plan B ?`, tip: "Un dossier sans analyse des risques est toujours rejeté.", chips: ["Concurrence forte", "Manque de clients", "Trésorerie tendue", "Appro difficile", "Risque réglementaire"] },
  { key: "fiscal_params", msg: `**Paramètres fiscaux & juridiques** (pour états financiers conformes banques) :\n\n**1.** Forme juridique envisagée ? (SARL, SA, SAS, LLC…)\n**2.** Êtes-vous (ou serez-vous) assujetti à la TVA ?\n**3.** Masse salariale mensuelle brute estimée ?\n**4.** Nature des immobilisations principales ? (équipements, local, véhicules)\n**5.** Délai moyen de paiement de vos clients (en jours) ?`, tip: "Ces données permettent de générer : Compte de résultat SYSCOHADA/IFRS, Bilan prévisionnel, DCF/VAN/TRI et tous les ratios exigés par les banques.", chips: ["SARL — TVA oui — Salariés oui", "SAS / SA — TVA oui", "Entreprise individuelle — TVA non", "GIE / Association", "Je ne sais pas encore"] },
];
const ACKS = [
  "Excellent choix ! Je calibre l'analyse sur ce secteur et la roadmap adaptée. 🚀",
  "Bonne description ! Positionnement clair. 📌",
  "Parfait ! Recommandations de financement et stratégie de pénétration adaptées à votre zone. 🌍",
  "Bonne analyse de marché. 💼",
  "Données d'investissement enregistrées. 📊",
  "Revenus estimés. Je calcule les 3 scénarios. ⚖️",
  "Structure des charges bien documentée. 🏦",
  "Stratégie de financement notée. 🛡️",
  "Analyse des risques complète ! 💡",
  "Paramètres fiscaux enregistrés. Je génère vos états financiers conformes (SYSCOHADA/IFRS), le DCF et les ratios bancaires... ⚙️",
];
const TEST_DATA = {
  type_projet: "Restaurant / Alimentation",
  presentation: "Restaurant cuisine béninoise à Cotonou, quartier Cadjehoun. Clientèle : salariés, familles, expatriés. Livraison moto-taxi.",
  zone_geo: "Afrique de l'Ouest (UEMOA/CEDEAO)",
  marche_clients: "Salariés 25-50 ans, rayon 2km. Objectif : 30 couverts/j mois 1, 80 couverts/j à 6 mois.",
  investissement_initial: "Total : 8 500 000 FCFA. Local 3M, équipements 2.5M, stock 1M, marketing 500K, BFR 1.5M.",
  revenus_ventes: "Ticket moyen 3 500 FCFA. 50 couverts/j semaine + 30 week-end = 4 690 000 FCFA/mois.",
  charges_couts: "Loyer 250K, salaires 600K, matières 1 640K, élec/eau 150K, packaging 80K, marketing 100K. Total : 2 900 000 FCFA.",
  financement: "Apport 2 500 000 FCFA. Prêt FINADEV 3 000 000 FCFA. Prêt familial 1 500 000 FCFA.",
  risques: "Concurrence maquis, recrutement cuisiniers, trésorerie mois 1-3. Plan B : réduire staff si CA < 2M.",
  fiscal_params: "SARL. TVA oui (CA > 50M FCFA dès An 2). 3 salariés, masse salariale 600K FCFA brut/mois. Équipements cuisine 2.5M FCFA amort. 5 ans. Délai clients : 0 jour (cash).",
};

// ══════════════════════════════════════════════════════════
// DOWNLOAD
// ══════════════════════════════════════════════════════════
async function downloadBP(data, uploadedDoc, setStatus) {
  setStatus("⏳ Génération IA en cours...");
  const { invest, revM, charges, cfM, cfA, roi, payback, marge, yearsC, cur } = calcFin(data);
  const zd = ZONES[data.zone_geo] || ZONES["Afrique de l'Ouest (UEMOA/CEDEAO)"];
  const today = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
  const { roadmap, strategy } = getRoadmapData(data.type_projet || "", data);

  let aiContent = {};
  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514", max_tokens: 2000,
        system: "Expert business plan. Retourne UNIQUEMENT du JSON valide sans markdown.",
        messages: [{ role: "user", content: `JSON avec: executive_summary, description_projet, analyse_marche, strategie_commerciale, plan_operationnel, analyse_risques, recommandations_financement (3-4 phrases chacun). Données: ${JSON.stringify({ type: data.type_projet, zone: data.zone_geo, presentation: data.presentation?.substring(0, 300), marche: data.marche_clients?.substring(0, 200), risques: data.risques?.substring(0, 200) })}` }]
      })
    });
    const r = await resp.json();
    aiContent = JSON.parse((r.content?.[0]?.text || "{}").replace(/```json|```/g, "").trim());
  } catch { aiContent = {}; }

  setStatus("📝 Assemblage...");
  const lines = [
    `BUSINESS PLAN — ${(data.type_projet || "PROJET").toUpperCase()}`,
    `Généré par Filano | ${today} | Zone : ${data.zone_geo}`,
    "═".repeat(72), "",
    "1. RÉSUMÉ EXÉCUTIF",
    "─".repeat(72),
    aiContent.executive_summary || data.presentation || "",
    "", "Indicateurs clés :",
    `  Investissement initial    : ${fmt(invest, cur)}`,
    `  Cash-flow mensuel         : ${fmt(cfM, cur)}`,
    `  ROI annuel estimé         : ${roi.toFixed(1)}%`,
    `  Retour sur investissement : ${payback > 99 ? ">99" : Math.ceil(payback)} mois`,
    `  Marge brute               : ${marge.toFixed(1)}%`,
    "", "2. DESCRIPTION DU PROJET",
    "─".repeat(72),
    aiContent.description_projet || data.presentation || "",
    "", "3. ANALYSE DE MARCHÉ",
    "─".repeat(72),
    aiContent.analyse_marche || data.marche_clients || "",
    "", "4. STRATÉGIE COMMERCIALE & PÉNÉTRATION DU MARCHÉ",
    "─".repeat(72),
    `Positionnement : ${strategy.positioning}`,
    `Stratégie de prix : ${strategy.pricing}`,
    "", "4.1 Tactiques de pénétration",
    ...(strategy.penetration?.map(t => `  ▶ ${t.strategy} : ${t.desc}`) || []),
    "", "4.2 Canaux d'acquisition prioritaires",
    ...(strategy.channels?.map((c, i) => `  ${i < 2 ? "[PRIORITAIRE]" : "[SECONDAIRE]"} ${c.n} — ${c.d}`) || []),
    "", "4.3 KPIs commerciaux à suivre",
    ...(strategy.kpis_cles?.map(k => `  • ${k}`) || []),
    "", "5. ROADMAP DE LANCEMENT",
    "─".repeat(72),
    ...roadmap.flatMap(p => [
      `${p.phase} — ${p.label} (${p.duration})`,
      `Objectif : ${p.kpi}`,
      ...p.tasks.map((t, i) => `  ${i+1}. ${t}`),
      ""
    ]),
    "6. PLAN FINANCIER",
    "─".repeat(72),
    "6.1 Investissement initial", data.investissement_initial || "",
    "", "6.2 Revenus & Ventes", data.revenus_ventes || "",
    "", "6.3 Structure des charges", data.charges_couts || "",
    "", "6.4 Projection Cash-Flow 5 ans",
    "Année | CA Estimé          | Charges            | Cash-Flow          | Cumulatif",
    "─".repeat(72),
    ...yearsC.map(r => `An ${r.y}  | ${fmt(r.rev, cur).padEnd(18)} | ${fmt(r.ch, cur).padEnd(18)} | ${fmt(r.cf, cur).padEnd(18)} | ${fmt(r.cum, cur)}`),
    "", "6.5 Scénarios",
    `  Optimiste (+30%) : CF/mois = ${fmt(cfM*1.3,cur)} | CF/an = ${fmt(cfM*1.3*12,cur)}`,
    `  Réaliste (base)  : CF/mois = ${fmt(cfM,cur)} | CF/an = ${fmt(cfA,cur)}`,
    `  Pessimiste (-50%): CF/mois = ${fmt(cfM*0.5,cur)} | CF/an = ${fmt(cfM*0.5*12,cur)}`,
    "", "7. STRATÉGIE DE FINANCEMENT (Données 2025)",
    "─".repeat(72),
    `Zone : ${data.zone_geo} | Taux bancaires : ${zd.rateBank} | Taux IMF : ${zd.rateIMF}`,
    "", aiContent.recommandations_financement || data.financement || "",
    "", "Banques recommandées :", ...(zd.banks||[]).map(b=>`  ▶ ${b.n} — ${b.d}`),
    "", "Microfinances / IMF :", ...(zd.imf||[]).map(b=>`  ▶ ${b.n} — ${b.d}`),
    "", "Fonds & Programmes 2025 :", ...(zd.funds||[]).map(b=>`  ▶ ${b.n} — ${b.d}`),
    "", "Investisseurs actifs 2025 :", ...(zd.investors||[]).map(b=>`  ▶ ${b.n} — ${b.d}`),
    "", `Conseil stratégique : ${zd.tips}`,
    "", "8. ANALYSE DES RISQUES",
    "─".repeat(72),
    aiContent.analyse_risques || data.risques || "",
    "", "Matrice de risques :",
    `  ⚠️ Trésorerie (3 premiers mois) → Réserve : ${fmt(charges*3,cur)}`,
    `  ⚠️ Ventes -50% → CF minimum : ${fmt(cfM*0.5,cur)}/mois`,
    `  ⚠️ Concurrence → Différenciation qualité/service`,
    ...(uploadedDoc ? [
      "", "9. ANALYSE DE VOTRE DOCUMENT EXISTANT",
      "─".repeat(72),
      `Document : ${uploadedDoc._fileName} (${uploadedDoc._fileSize})`,
      uploadedDoc.resume_document ? `\nRésumé : ${uploadedDoc.resume_document}` : "",
      uploadedDoc.points_forts ? `\nPoints forts : ${uploadedDoc.points_forts}` : "",
      uploadedDoc.points_amelioration ? `\nPoints à améliorer : ${uploadedDoc.points_amelioration}` : "",
    ] : []),
    "", "10. ANNEXES",
    "─".repeat(72),
    "  • CV du porteur de projet", "  • Devis fournisseurs", "  • Justificatifs apport personnel", "  • Extrait registre commerce",
    "", "═".repeat(72),
    `Document généré par Filano — ${today}`,
    "⚠️ À valider par un expert-comptable agréé avant soumission officielle.",
  ].join("\n");

  const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url;
  a.download = `BusinessPlan_Filano_${(data.type_projet||"Projet").replace(/[\s\/]/g,"_")}_${new Date().toISOString().split("T")[0]}.txt`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  setStatus(null);
}

// ══════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════
export default function Filano() {
  const [screen, setScreen] = useState("welcome");
  const [msgs, setMsgs] = useState([]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [cData, setCData] = useState({});
  const [uploadedDoc, setUploadedDoc] = useState(null);
  const [dlStatus, setDlStatus] = useState(null);
  const [pitchStatus, setPitchStatus] = useState(null);
  const [testMode, setTestMode] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  function addMsg(content, isUser = false, tip = null, chips = null) {
    setMsgs(prev => [...prev, { content, isUser, tip, chips, id: Date.now() + Math.random() }]);
  }
  async function askStep(s, delay = 800) {
    if (s >= QS.length) { setScreen("results"); return; }
    setTyping(true);
    await new Promise(r => setTimeout(r, delay));
    setTyping(false);
    const q = QS[s];
    addMsg(q.msg, false, q.tip, q.chips);
    setStep(s);
  }
  function mergeWithDoc(base) {
    if (!uploadedDoc) return base;
    const merged = { ...base };
    ["type_projet","presentation","zone_geo","marche_clients","investissement_initial","revenus_ventes","charges_couts","financement","risques"].forEach(f => { if (!merged[f] && uploadedDoc[f]) merged[f] = uploadedDoc[f]; });
    return merged;
  }
  async function proceedToChat() {
    setCData(uploadedDoc ? mergeWithDoc({}) : {});
    setScreen("chat"); setMsgs([]); setStep(0);
    if (uploadedDoc) {
      addMsg(`✅ Document **"${uploadedDoc._fileName}"** analysé ! Complétons les informations manquantes...`, false);
      await new Promise(r => setTimeout(r, 400));
    }
    await askStep(0, 400);
  }
  async function sendMsg(text) {
    const msg = (text || input).trim();
    if (!msg || typing) return;
    setInput(""); addMsg(msg, true);
    const key = QS[step]?.key;
    const newData = mergeWithDoc({ ...cData, [key]: msg });
    setCData(newData);
    setTyping(true);
    await new Promise(r => setTimeout(r, testMode ? 250 : 800));
    setTyping(false);
    if (ACKS[step]) { addMsg(ACKS[step], false); await new Promise(r => setTimeout(r, 200)); }
    if (step + 1 >= QS.length) { setCData(newData); addMsg("Parfait ! Je génère votre analyse complète avec roadmap et stratégies... 📊", false); await new Promise(r => setTimeout(r, 400)); setScreen("results"); }
    else { await askStep(step + 1, testMode ? 250 : 800); }
  }
  function restart() { setScreen("welcome"); setMsgs([]); setStep(0); setInput(""); setCData({}); setUploadedDoc(null); setTestMode(false); }
  function goDemo() { setTestMode(true); setCData(TEST_DATA); setScreen("results"); }
  const activeData = Object.keys(cData).length > 0 ? cData : (uploadedDoc ? mergeWithDoc(TEST_DATA) : TEST_DATA);
  const stepIdx = screen === "results" ? 9 : step;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#0a0c10", color: "#e8eaf0", fontFamily: "'Segoe UI', sans-serif", overflow: "hidden" }}>

      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", borderBottom: "1px solid #252b38", background: "#0d1117", flexShrink: 0 }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, background: "linear-gradient(135deg,#f0a500,#e05c2a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Fi<em>lano</em>
        </div>
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          {testMode && <span style={{ fontSize: 10, background: "rgba(74,158,255,0.12)", color: "#4a9eff", border: "1px solid rgba(74,158,255,0.22)", padding: "2px 9px", borderRadius: 18, fontWeight: 700 }}>🧪 TEST</span>}
          {uploadedDoc && <span style={{ fontSize: 10, background: "rgba(46,204,138,0.1)", color: "#2ecc8a", border: "1px solid rgba(46,204,138,0.22)", padding: "2px 9px", borderRadius: 18, fontWeight: 700 }}>📄 {uploadedDoc._fileName}</span>}
          <span style={{ fontSize: 10, color: "#7a8299", border: "1px solid #252b38", padding: "2px 9px", borderRadius: 18 }}>Analyste Business IA</span>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* SIDEBAR */}
        <div style={{ width: 190, borderRight: "1px solid #252b38", padding: "12px 8px", overflowY: "auto", background: "#111419", flexShrink: 0, display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "#7a8299", marginBottom: 7, padding: "0 4px" }}>Progression</div>
          {STEPS_LIST.map((s, i) => {
            const isA = i === stepIdx, isDone = i < stepIdx;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 7px", borderRadius: 7, background: isA ? "rgba(240,165,0,0.08)" : "transparent", border: `1px solid ${isA ? "rgba(240,165,0,0.28)" : "transparent"}`, transition: "all 0.2s" }}>
                <div style={{ width: 19, height: 19, borderRadius: "50%", background: isDone ? "#2ecc8a" : isA ? "#f0a500" : "#181c24", border: `1px solid ${isDone ? "#2ecc8a" : isA ? "#f0a500" : "#252b38"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: isDone || isA ? "#000" : "#7a8299", flexShrink: 0 }}>
                  {isDone ? "✓" : i + 1}
                </div>
                <div style={{ fontSize: 10, color: isDone ? "#2ecc8a" : isA ? "#e8eaf0" : "#3d4560", fontWeight: isA ? 700 : 400 }}>{s.icon} {s.l}</div>
              </div>
            );
          })}
          {uploadedDoc && (
            <div style={{ marginTop: 10, background: "rgba(46,204,138,0.06)", border: "1px solid rgba(46,204,138,0.2)", borderRadius: 9, padding: 10 }}>
              <div style={{ fontSize: 8, color: "#2ecc8a", fontWeight: 700, marginBottom: 4 }}>📄 DOCUMENT</div>
              <div style={{ fontSize: 9, color: "#a8e6c8", lineHeight: 1.4 }}>{uploadedDoc._fileName}</div>
              <button onClick={() => { setUploadedDoc(null); setScreen("upload"); }} style={{ marginTop: 6, width: "100%", padding: "4px 7px", background: "transparent", border: "1px solid rgba(46,204,138,0.3)", borderRadius: 5, color: "#2ecc8a", fontSize: 9, cursor: "pointer", fontFamily: "inherit" }}>Remplacer</button>
            </div>
          )}
          <div style={{ marginTop: 10, background: "rgba(74,158,255,0.05)", border: "1px solid rgba(74,158,255,0.15)", borderRadius: 9, padding: 10 }}>
            <div style={{ fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: "#4a9eff", marginBottom: 7, fontWeight: 700 }}>🧪 Tests</div>
            {[{ l: "⚡ Démo résultats", c: "#f0a500", a: goDemo }, { l: "🔄 Reset", c: "#7a8299", a: restart }].map((b, i) => (
              <button key={i} onClick={b.a} style={{ display: "block", width: "100%", marginBottom: 4, padding: "5px 8px", background: `${b.c}18`, border: `1px solid ${b.c}44`, borderRadius: 5, color: b.c, fontSize: 9, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, textAlign: "left" }}>{b.l}</button>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* WELCOME */}
          {screen === "welcome" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, padding: 32, textAlign: "center" }}>
              <div style={{ width: 68, height: 68, background: "linear-gradient(135deg,#f0a500,#e05c2a)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>📈</div>
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 30, fontWeight: 700, background: "linear-gradient(135deg,#f0a500,#e05c2a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Filano</div>
                <div style={{ fontSize: 14, color: "#7a8299", marginTop: 2 }}>Votre analyste business propulsé par l'IA</div>
              </div>
              <div style={{ color: "#a0a8c0", maxWidth: 440, fontSize: 13, lineHeight: 1.8 }}>Importez votre plan d'affaires existant pour une analyse enrichie, ou démarrez directement.</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%", maxWidth: 500 }}>
                {[
                  { icon: "📤", t: "J'ai déjà un plan d'affaires", s: "Importez PDF, Word, image", c: "#f0a500", a: () => setScreen("upload"), primary: true },
                  { icon: "💬", t: "Je pars de zéro", s: "Questionnaire guidé (9 questions)", c: "#4a9eff", a: proceedToChat, primary: false },
                ].map((b, i) => (
                  <button key={i} onClick={b.a} style={{ padding: "18px 16px", background: b.primary ? "linear-gradient(135deg,rgba(240,165,0,0.12),rgba(224,92,42,0.08))" : "rgba(74,158,255,0.06)", border: `1px solid ${b.primary ? "rgba(240,165,0,0.35)" : "rgba(74,158,255,0.25)"}`, borderRadius: 14, cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
                    <div style={{ fontSize: 26 }}>{b.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: b.c }}>{b.t}</div>
                    <div style={{ fontSize: 11, color: "#7a8299", lineHeight: 1.4 }}>{b.s}</div>
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                {["📊 Finances + États SYSCOHADA", "📈 DCF · VAN · TRI", "⚖️ Ratios bancaires", "🗺️ Roadmap", "💰 Financement 2025", "🎯 Pitch Deck"].map(f => (
                  <span key={f} style={{ background: "#111419", border: "1px solid #252b38", borderRadius: 8, padding: "4px 11px", fontSize: 10, color: "#f0a500" }}>✓ {f}</span>
                ))}
              </div>
            </div>
          )}

          {/* UPLOAD */}
          {screen === "upload" && (
            <div style={{ padding: "28px 32px", overflowY: "auto", height: "100%", display: "flex", flexDirection: "column", gap: 20, maxWidth: 700, margin: "0 auto", width: "100%" }}>
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>📤 Importer votre plan d'affaires</div>
                <div style={{ fontSize: 12, color: "#7a8299", lineHeight: 1.6 }}>L'IA analyse votre document et extrait automatiquement les informations clés.</div>
              </div>
              <DocUpload onExtracted={setUploadedDoc} existingDoc={uploadedDoc} />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button onClick={() => proceedToChat()} disabled={!uploadedDoc} style={{ flex: 1, padding: "12px 20px", background: uploadedDoc ? "linear-gradient(135deg,#f0a500,#e05c2a)" : "#252b38", border: "none", borderRadius: 11, color: uploadedDoc ? "#000" : "#555e77", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: uploadedDoc ? "pointer" : "not-allowed" }}>
                  {uploadedDoc ? "Continuer avec ce document →" : "Attendez l'analyse..."}
                </button>
                {uploadedDoc && <button onClick={() => { setCData(mergeWithDoc(TEST_DATA)); setScreen("results"); }} style={{ padding: "12px 18px", background: "rgba(46,204,138,0.1)", border: "1px solid rgba(46,204,138,0.3)", borderRadius: 11, color: "#2ecc8a", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>⚡ Voir l'analyse</button>}
              </div>
              <button onClick={() => setScreen("welcome")} style={{ alignSelf: "flex-start", padding: "7px 15px", background: "transparent", border: "1px solid #252b38", borderRadius: 8, color: "#7a8299", cursor: "pointer", fontSize: 11, fontFamily: "inherit" }}>← Retour</button>
            </div>
          )}

          {/* CHAT */}
          {screen === "chat" && (
            <>
              <div style={{ flex: 1, overflowY: "auto", padding: "15px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
                {msgs.map(msg => (
                  <div key={msg.id} style={{ display: "flex", gap: 9, flexDirection: msg.isUser ? "row-reverse" : "row", maxWidth: 740, alignSelf: msg.isUser ? "flex-end" : "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, marginTop: 2, background: msg.isUser ? "#181c24" : "linear-gradient(135deg,#f0a500,#e05c2a)", border: msg.isUser ? "1px solid #252b38" : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: msg.isUser ? 12 : 9, fontWeight: 700, color: msg.isUser ? "#e8eaf0" : "#000" }}>
                      {msg.isUser ? "👤" : "AI"}
                    </div>
                    <div style={{ maxWidth: 560 }}>
                      <div style={{ padding: "10px 13px", borderRadius: 12, lineHeight: 1.7, fontSize: 12, background: msg.isUser ? "rgba(240,165,0,0.08)" : "#111419", border: `1px solid ${msg.isUser ? "rgba(240,165,0,0.2)" : "#252b38"}`, borderTopLeftRadius: msg.isUser ? 12 : 3, borderTopRightRadius: msg.isUser ? 3 : 12 }}>
                        {fmtTxt(msg.content)}
                      </div>
                      {msg.tip && <div style={{ background: "rgba(74,158,255,0.05)", borderLeft: "3px solid #4a9eff", borderRadius: "0 8px 8px 0", padding: "7px 11px", marginTop: 5, fontSize: 10, color: "#a8c8ff", lineHeight: 1.65 }}><strong style={{ color: "#4a9eff", display: "block", marginBottom: 2 }}>💡</strong>{msg.tip}</div>}
                      {msg.chips && <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 7 }}>{msg.chips.map(c => <button key={c} onClick={() => sendMsg(c)} style={{ padding: "4px 10px", borderRadius: 14, border: "1px solid #252b38", background: "#181c24", color: "#e8eaf0", fontSize: 10, cursor: "pointer", fontFamily: "inherit" }} onMouseEnter={e => { e.target.style.borderColor = "#f0a500"; e.target.style.color = "#f0a500"; }} onMouseLeave={e => { e.target.style.borderColor = "#252b38"; e.target.style.color = "#e8eaf0"; }}>{c}</button>)}</div>}
                    </div>
                  </div>
                ))}
                {typing && <div style={{ display: "flex", gap: 9 }}><div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#f0a500,#e05c2a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#000" }}>AI</div><div style={{ padding: "10px 14px", background: "#111419", border: "1px solid #252b38", borderRadius: "3px 12px 12px 12px", display: "flex", gap: 5, alignItems: "center" }}>{[0,0.2,0.4].map((d,i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#7a8299", animation: "bounce 1.2s infinite ease-in-out", animationDelay: `${d}s` }} />)}</div></div>}
                <div ref={endRef} />
              </div>
              <div style={{ padding: "10px 18px 13px", borderTop: "1px solid #252b38" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 7, background: "#111419", border: "1px solid #252b38", borderRadius: 11, padding: "8px 11px" }}>
                  <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMsg(); } }} placeholder="Tapez votre réponse... (Entrée pour envoyer)" rows={1} style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#e8eaf0", fontFamily: "inherit", fontSize: 12, resize: "none", maxHeight: 80, lineHeight: 1.5 }} />
                  <button onClick={() => sendMsg()} style={{ width: 30, height: 30, borderRadius: 7, background: "linear-gradient(135deg,#f0a500,#e05c2a)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* RESULTS */}
          {screen === "results" && <Results
            data={activeData}
            uploadedDoc={uploadedDoc}
            onRestart={restart}
            onDownload={() => downloadBP(activeData, uploadedDoc, setDlStatus)}
            dlStatus={dlStatus}
            onPitch={async (meta, onDone) => {
              try {
                await generatePitchDeck(activeData, meta, uploadedDoc, setPitchStatus);
              } catch(e) {
                alert("Erreur lors de la génération : " + (e.message || e));
              } finally {
                setPitchStatus(null);
                if (onDone) onDone();
              }
            }}
            pitchStatus={pitchStatus}
          />}
        </div>
      </div>

      <style>{`
        @keyframes bounce { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-5px);opacity:1} }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #252b38; border-radius: 4px; }
        textarea::placeholder { color: #7a8299; }
      `}</style>
    </div>
  );
}
