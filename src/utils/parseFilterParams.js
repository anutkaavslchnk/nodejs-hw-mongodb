const parseIsFav = (fav) => {
    if (typeof fav === 'string') {
      if (fav === 'true') return true;
      if (fav === 'false') return false;
    }
    return undefined;
  };


  export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedType = typeof type === 'string' ? type : undefined;
    const parsedIsFav = parseIsFav(isFavourite);

    return {
      type: parsedType,
      isFavourite: parsedIsFav,
    };
  };

