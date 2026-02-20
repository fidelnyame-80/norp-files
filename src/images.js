const IMAGE_FILES = [
  'asian-anime-girl-boobs.png',
  'asian-beauty.png',
  'asian-boobs.png',
  'asian-boobs-oiled.png',
  'asian-boobs-sun-kissed.png',
  'asian-girl-boobs-oiled.png',
  'asian-girlfriend-boobs.png',
  'asian-oiled-up-boobs.png',
  'attractive-latina-girl.png',
  'attractive-mixed-race-girl-boobs.png',
  'beautiful-mixed-race-girl.png',
  'big-boobed-asian.png',
  'curvy-latina-boobs.png',
  'curvy-latina-naturals.png',
  'cute-asian-boobs.png',
  'cute-latina-boobs.png',
  'cute-latina-woman-boobs.png',
  'cute-white-girl-tits.png',
  'ebony-boobs-oiled-up.png',
  'ebony-oiled.png',
  'ebony-oiled-boobs.png',
  'ebony-perky-boobs.png',
  'ebony-perky-tits.png',
  'elegant-natural-latina-tits.png',
  'gorgeous-asian-tits.png',
  'gorgeous-ebony-boobs.png',
  'gorgeous-latina.png',
  'gorgeous-latina-boobs.png',
  'gorgeous-mixed-race-girl.png',
  'hot-asian-girl-tits.png',
  'hot-asian-girl-titties.png',
  'hot-body-asian.png',
  'hot-caucasian-white-girl.png',
  'hot-latina.png',
  'hot-latina-girl.png',
  'hot-mixed-race-girl.png',
  'hot-white-girl-nude.png',
  'hot-white-girl-titties.png',
  'huge-boobs-caucasian-white-girl.png',
  'huge-boobs-latina.png',
  'huge-saggy-tit-latina.png',
  'irrestible-mixed-race-girl-boobs.png',
  'large-boob-asian-girl.png',
  'latina-boobs-watered-up.png',
  'lightskinned-ebony-tits.png',
  'light-skinned-oiled.png',
  'lovely-tits-mixed-race-girl.png',
  'mixed-race-beauty-boobs.png',
  'mixed-race-beauty-queen-boobs.png',
  'mixed-race-ebony-girl-nude.png',
  'mixed-race-ebony-naturals.png',
  'mixed-race-girl.png',
  'mixed-race-girl-green-eyes.png',
  'mixed-race-girl-green-eyes-nude.png',
  'mixed-race-girl-nude.png',
  'mixed-race-girl-red-eyes-boobs.png',
  'mixed-race-goddess-boobs.png',
  'mixed-race-woman-boobs.png',
  'mixed-race-woman-naturals.png',
  'natural-mixed-race-girl.png',
  'natural-mixed-race-woman-nude-pose.png',
  'nice-ebony-boobs.png',
  'nice-latina-girl-tits.png',
  'nice-latina-tits.png',
  'nice-white-girl-boobs.png',
  'no-nipple-asian-girl-boobs.png',
  'outstanding-beauty-latina-model-boobs.png',
  'perfect-asian-boobs.png',
  'perfect-asian-tits.png',
  'perky-asian-girl-boobs.png',
  'perky-ebony-boobs.png',
  'perky-ebony-tits.png',
  'pretty-asian-boobs.png',
  'pretty-asian-tits.png',
  'pretty-mixed-race-girl.png',
  'puffy-boobs-asian.png',
  'red-head-white-girl-boobs.png',
  'saggy-tit-asian.png',
  'seductive-latina-girl.png',
  'seductive-white-girl-boobs.png',
  'sexy-asian-tits.png',
  'sexy-ebony.png',
  'sexy-latina-boobs.png',
  'sexy-latina-boobs-watered-up.png',
  'sexy-latina-girl.png',
  'slim-asian-girl-boobs.png',
  'slim-attractive-asian-girl-boobs.png',
  'slim-ebony-boobs.png',
  'stunning-asian-girl-boobs.png',
  'stunning-beauty-mixed-race-girl.png',
  'stunning-beauty-mixed-race-girl-nude.png',
  'stunning-beauty-white-girl-boobs.png',
  'stunning-mixed-race-girl-nude-pose.png',
  'stunning-mixed-race-woman-nude-pose.png',
  'very-attractive-mixed-race-girl-boobs.png',
  'very-cute-mixed-race-girl.png',
  'very-pretty-white-girl-nude.png',
  'white-blonde-girl-boobs.png',
  'white-girl-pose.png'
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
