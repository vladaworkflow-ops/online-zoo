interface cardData {
  id: number;
  petImg: string;
  petIcon: string;
}

const order = [
  'panda-card.png',
  'lemur-card.png',
  'gorilla-card.png',
  'crocodale-card.png',
  'eagles-card.png',
  'coala-card.png',
  'lion-card.png',
  'tygr-card.png',
  'red-panda.jpg',
  'gorilla.jpg',
  'elephant-card.jpg',
  'otter-card.jpg',
  'bengal-tiger.jpg',
  'wolf-card.jpg',
  'fox-card.jpg',
  'grizzly-card.jpg',
  'dolphin-card.jpg',
  'leopard-card.jpg',
  'polar-bear.jpg',
  'jaguar.jpg',
  'ring-tailed-lemur.jpg',
  'white-rhinoceros.jpg',
  'arctic-fox.jpg',
  'saltwater-crocodile.jpg',
  'scarlet-macaw.jpg',
  'komodo-dragon.jpg',
  'sloth.jpg',
  'cheetah.jpg',
];

const modules = import.meta.glob(
  '../assets/images/cards/*.{png,jpg,jpeg}',
  { eager: true, import: 'default' }
) as Record<string, string>;

export const cardData = Object.entries(modules)
  .sort(([a], [b]) => {
    const nameA = a.split('/').pop() || '';
    const nameB = b.split('/').pop() || '';

    return order.indexOf(nameA) - order.indexOf(nameB);
  })
  .map(([path, url], index) => ({
    id: index + 1,
    petImg: url,
    petIcon: '',
  }));