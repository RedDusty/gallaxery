import firebase from 'firebase';
import { BLOCKS_CONFIRMED_LOADING } from '../types';

const initialState = {
  blocks: [],
};

export default function blocksReducer(state = initialState, action) {
  switch (action.type) {
    case BLOCKS_CONFIRMED_LOADING: {
      const { blockId } = action.payload;
      let blocks = [];
      let dataLength = 1;
      blockLoading(blocks);
      async function blockLoading(blocks) {
        const data = await firebase
          .firestore()
          .collection('confirmed')
          .orderBy('id', 'asc')
          .startAfter(blockId)
          .limit(1)
          .get();
        dataLength = data.size;
        if (data.size !== 0) {
          const storage = firebase.storage();

          data.forEach((doc) => {
            const imgPath = 'confirmed/' + doc.data().images[0] + '.jpg';
            const pathRef = storage.ref(imgPath).getDownloadURL();
            pathRef
              .then((url) => {
                blocks.push({
                  id: doc.data().id,
                  name: doc.data().name,
                  imageUrl: url,
                });
              })
              .catch((error) => {
                switch (error.code) {
                  case 'storage/object-not-found':
                    return `Image doesn\'t exist.`;
                  case 'storage/unauthorized':
                    return `You don\'t have permission.`;
                  case 'storage/unknown':
                    return `Unknown error.`;
                }
              });
          });
        } else {
          blocks = false;
        }
      }
      return { ...state, blocks: blocks };
    }
    default: {
      return { ...state };
    }
  }
}
