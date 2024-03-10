import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./WelcomeScreen.css"

import image1 from "../../images/φόντο welcome.png";
import image2 from "../../images/gradday.png";
import image3 from "../../images/stairs.png";
import image4 from "../../images/toixos.png";


const imageData = [
  {
    label: "Image 1",
    alt: "image1",
    url: image1,
    text: {
        title: "Καλωσήρθατε στο MyStudies!",
        description: (
            <>Εδώ μπορείς να δηλώσεις μαθήματα, να δεις τη βαθμολογία<br />σου και να εκδόσεις πιστοποιητικά.</>
        ),
    }
  },
  {
    label: "Image 2",
    alt: "image2",
    url: image2,
    text: {
        title: "Μείνε ενημερωμένος/η!",
        description: (
            <>Μάθε τα νεότερα για τις δηλώσεις μαθημάτων, τις υποτροφίες και<br/>όλα τα θέματα φοίτησης.</>
        ),
    }
  },
  {
    label: "Image 3",
    alt: "image3",
    url: image3,
    text: {
        title: "Βαθμολόγησε!",
        description: "Διαχειρίσου τα βαθμολόγιά σου με τον πιο έυκολο και αποτελεσματικό τρόπο."
    }
  },
  {
    label: "Image 4",
    alt: "image4",
    url: image4,
    text: {
        title: "Δες τα στατιστικά σου!",
        description: "Δες τον μέσο όρο σου και το ποσοστό των περασμένων μαθημάτων σου."
    }
  }
];

const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
      <img src={image.url} alt={image.alt} />
      <div className="welcome-screen-container">
        <h1>{image.text.title}</h1>
        <span>{image.text.description}</span>
      </div>
    </div>
  ));
  

export default function WelcomeScreen() {
  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }
  return (
    <div className="welcome-screen">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        selectedItem={imageData[currentIndex]}
        onChange={handleChange}
        showThumbs={false}
        className="welcome-screen-carousel-container"
      >
        {renderSlides}
      </Carousel>
    </div>
  );
}