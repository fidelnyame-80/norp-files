const IMAGE_FILES = [
  'asian-anime-girl-boobs.webp',
  'asian-beauty.webp',
  'asian-boobs.webp',
  'asian-boobs-oiled.webp',
  'asian-boobs-sun-kissed.webp',
  'asian-girl-boobs-oiled.webp',
  'asian-girlfriend-boobs.webp',
  'asian-oiled-up-boobs.webp',
  'attractive-latina-girl.webp',
  'attractive-mixed-race-girl-boobs.webp',
  'beautiful-mixed-race-girl.webp',
  'big-boobed-asian.webp',
  'curvy-latina-boobs.webp',
  'curvy-latina-naturals.webp',
  'cute-asian-boobs.webp',
  'cute-latina-boobs.webp',
  'cute-latina-woman-boobs.webp',
  'cute-white-girl-tits.webp',
  'ebony-boobs-oiled-up.webp',
  'ebony-oiled.webp',
  'ebony-oiled-boobs.webp',
  'ebony-perky-boobs.webp',
  'ebony-perky-tits.webp',
  'elegant-natural-latina-tits.webp',
  'gorgeous-asian-tits.webp',
  'gorgeous-ebony-boobs.webp',
  'gorgeous-latina.webp',
  'gorgeous-latina-boobs.webp',
  'gorgeous-mixed-race-girl.webp',
  'hot-asian-girl-tits.webp',
  'hot-asian-girl-titties.webp',
  'hot-body-asian.webp',
  'hot-caucasian-white-girl.webp',
  'hot-latina.webp',
  'hot-latina-girl.webp',
  'hot-mixed-race-girl.webp',
  'hot-white-girl-nude.webp',
  'hot-white-girl-titties.webp',
  'huge-boobs-caucasian-white-girl.webp',
  'huge-boobs-latina.webp',
  'huge-saggy-tit-latina.webp',
  'irrestible-mixed-race-girl-boobs.webp',
  'large-boob-asian-girl.webp',
  'latina-boobs-watered-up.webp',
  'lightskinned-ebony-tits.webp',
  'light-skinned-oiled.webp',
  'lovely-tits-mixed-race-girl.webp',
  'mixed-race-beauty-boobs.webp',
  'mixed-race-beauty-queen-boobs.webp',
  'mixed-race-ebony-girl-nude.webp',
  'mixed-race-ebony-naturals.webp',
  'mixed-race-girl.webp',
  'mixed-race-girl-green-eyes.webp',
  'mixed-race-girl-green-eyes-nude.webp',
  'mixed-race-girl-nude.webp',
  'mixed-race-girl-red-eyes-boobs.webp',
  'mixed-race-goddess-boobs.webp',
  'mixed-race-woman-boobs.webp',
  'mixed-race-woman-naturals.webp',
  'natural-mixed-race-girl.webp',
  'natural-mixed-race-woman-nude-pose.webp',
  'nice-ebony-boobs.webp',
  'nice-latina-girl-tits.webp',
  'nice-latina-tits.webp',
  'nice-white-girl-boobs.webp',
  'no-nipple-asian-girl-boobs.webp',
  'outstanding-beauty-latina-model-boobs.webp',
  'perfect-asian-boobs.webp',
  'perfect-asian-tits.webp',
  'perky-asian-girl-boobs.webp',
  'perky-ebony-boobs.webp',
  'perky-ebony-tits.webp',
  'pretty-asian-boobs.webp',
  'pretty-asian-tits.webp',
  'pretty-mixed-race-girl.webp',
  'puffy-boobs-asian.webp',
  'red-head-white-girl-boobs.webp',
  'saggy-tit-asian.webp',
  'seductive-latina-girl.webp',
  'seductive-white-girl-boobs.webp',
  'sexy-asian-tits.webp',
  'sexy-ebony.webp',
  'sexy-latina-boobs.webp',
  'sexy-latina-boobs-watered-up.webp',
  'sexy-latina-girl.webp',
  'slim-asian-girl-boobs.webp',
  'slim-attractive-asian-girl-boobs.webp',
  'slim-ebony-boobs.webp',
  'stunning-asian-girl-boobs.webp',
  'stunning-beauty-mixed-race-girl.webp',
  'stunning-beauty-mixed-race-girl-nude.webp',
  'stunning-beauty-white-girl-boobs.webp',
  'stunning-mixed-race-girl-nude-pose.webp',
  'stunning-mixed-race-woman-nude-pose.webp',
  'very-attractive-mixed-race-girl-boobs.webp',
  'very-cute-mixed-race-girl.webp',
  'very-pretty-white-girl-nude.webp',
  'white-blonde-girl-boobs.webp',
  'white-girl-pose.webp'
];

const CATEGORY_PATTERNS = [
  { category: 'Mixed', pattern: /mixed-race/ },
  { category: 'Latina', pattern: /latina/ },
  { category: 'Asian', pattern: /asian/ },
  { category: 'White', pattern: /white|caucasian|blonde|red-head/ },
  { category: 'Black', pattern: /ebony|black|light-skinned|lightskinned/ }
];

const CATEGORY_VIEW_BOOST = {
  Asian: 1900,
  Black: 1500,
  Latina: 1700,
  White: 1300,
  Mixed: 2100,
  All: 1000
};

function inferCategory(fileName) {
  const normalized = fileName.toLowerCase();
  const matched = CATEGORY_PATTERNS.find(({ pattern }) => pattern.test(normalized));
  return matched ? matched.category : 'All';
}

function buildTitleFromFileName(fileName) {
  const baseName = fileName.replace(/\.[^/.]+$/, '');
  return baseName
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildRating(index) {
  const value = 4.4 + (((index + 1) * 3) % 7) / 10;
  return Number(Math.min(5, value).toFixed(1));
}

function buildViews(index, category) {
  const base = 1700 + index * 185;
  const cyclicalLift = (index % 5) * 240;
  const categoryLift = CATEGORY_VIEW_BOOST[category] || CATEGORY_VIEW_BOOST.All;
  return base + cyclicalLift + categoryLift;
}

function buildTags(index, views) {
  const tags = [];
  if ((index + 1) % 5 === 0) {
    tags.push('featured');
  }
  if (views >= 12000 || (index + 1) % 4 === 0) {
    tags.push('popular');
  }
  return tags;
}

export const images = IMAGE_FILES.map((fileName, index) => {
  const category = inferCategory(fileName);
  const views = buildViews(index, category);

  return {
    id: index + 1,
    image: `/images/${fileName}`,
    title: buildTitleFromFileName(fileName),
    rating: buildRating(index),
    views,
    category,
    tags: buildTags(index, views)
  };
});
