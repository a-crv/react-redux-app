import { getRandomInRange } from '../../utils';

const createItemsData = (count) => {
  const itemsData = [];

  for (let i = 0; i < count; i += 1) {
    const randomCount = getRandomInRange(1, 250);

    itemsData.push({
      id: i,
      rating: 0,
      url: `https://unsplash.it/200/200?image=${randomCount}`
    });
  }

  return itemsData;
};

export default createItemsData;
