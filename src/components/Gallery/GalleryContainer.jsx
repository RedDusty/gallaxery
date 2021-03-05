import React, { useCallback, useEffect, useRef, useState } from 'react';
import Gallery from './Gallery';

import { blocksConfirmedLoading } from '../../redux/actions';
import { connect } from 'react-redux';

import firebase from 'firebase';

const GalleryContainer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [imagesBlocks, setImagesBlocks] = useState([]);

  const confirmedRef = firebase.firestore().collection('confirmed');

  useEffect(() => {
    getConfirmedImages();
  }, []);

  async function getConfirmedImages() {
    setIsLoading(true);

    const snapshot = await confirmedRef.orderBy('id', 'asc').limit(1).get();

    if (!snapshot.empty) {
      let newConfirmedImages = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      const storage = firebase.storage();

      for (let i = 0; i < snapshot.docs.length; i++) {
        const imagesLength = snapshot.docs[i].data().images.length;
        let imageLinks = [];
        for (let j = 0; j < imagesLength; j++) {
          const imgPath =
            'confirmed/' + snapshot.docs[i].data().images[0] + '.jpg';
          const pathRef = storage.ref(imgPath).getDownloadURL();
          pathRef.then((url) => {
            imageLinks.push(url);
          });
        }

        const data = snapshot.docs[i].data();
        newConfirmedImages.push({
          author: data.author,
          comment: data.comment,
          data: data.data,
          id: data.id,
          images: imageLinks,
          links: data.links,
          name: data.name,
          tags: data.tags,
        });
      }

      setImagesBlocks(newConfirmedImages);
    } else {
      setLastDoc(null);
    }

    setIsLoading(false);
  }

  // async function getMore() {
  //   if (lastDoc) {
  //     setIsMoreLoading(true);

  //     let snapshot = await confirmedRef
  //       .orderBy('id')
  //       .startAfter(lastDoc.data().id)
  //       .limit(1)
  //       .get();

  //     if (!snapshot.empty) {
  //       let newConfirmedImages = imagesBlocks;

  //       let storage = firebase.storage();

  //       setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

  //       for (let i = 0; i < snapshot.docs.length; i++) {
  //         const imagesLength = snapshot.docs[i].data().images.length;
  //         let imageLinks = [];
  //         for (let j = 0; j < imagesLength; j++) {
  //           const imgPath =
  //             'confirmed/' + snapshot.docs[i].data().images[0] + '.jpg';
  //           const pathRef = storage.ref(imgPath).getDownloadURL();
  //           pathRef.then((url) => {
  //             imageLinks.push(url);
  //           });
  //           console.log(imageLinks);
  //         }

  //         let data = snapshot.docs[i].data();
  //         newConfirmedImages.push({
  //           author: data.author,
  //           comment: data.comment,
  //           data: data.data,
  //           id: data.id,
  //           images: imageLinks,
  //           links: data.links,
  //           name: data.name,
  //           tags: data.tags,
  //         });
  //       }

  //       setImagesBlocks(newConfirmedImages);
  //       if (snapshot.docs.length < 1) setLastDoc(null);
  //     } else {
  //       setLastDoc(null);
  //     }
  //   }
  // }

  function checker(loadingElementRef) {
    if (isLoading) {
      return (
        <div className="loading">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="dataLoaded">
          <div className="dataLoaded-icon"></div>
          <div className="dataLoaded-text">All data loaded.</div>
        </div>
      );
    }
  }

  const allImageBlocks = imagesBlocks.map((block) => {
    return (
      <div
        className="imageContainer"
        key={block.id}
        style={{
          backgroundColor: 'gray',
          width: '350px',
          height: '200px',
        }}
      >
        <img
          className="imageSrc"
          src={block.images[0]}
          alt={'Submit to support. Link to image: ' + block.images[0]}
        />
      </div>
    );
  });

  const vars = {
    allImageBlocks,
  };

  const functions = {
    checker,
    checker,
  };

  return <Gallery vars={vars} functions={functions} />;
};

const mapStateToProps = (state) => {
  return {
    blocks: state.blocksReducer.blocks,
    update: state.blocksReducer.update,
  };
};

const mapDispatchToProps = {
  blocksConfirmedLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);
