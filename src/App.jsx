import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StarsBackground from "./StarsBackground";
import AIFiestaLanding from "./web";
import CardStackComponent from "./cards";
import AIModelPicker from "./info";
import CompleteFightMisinformationSection from "./footer";
import ParallaxGallery from "./gallery";
import MergedComponent from "./effect";
import TruthGuard from "./truthGuard";
import QnAUI from "./Qna";

function App() {
  return (
      <Routes>
        {/* Landing Page (Main Page) */}
        <Route
          path="/"
          element={
            <div>
              <StarsBackground />
              <AIFiestaLanding />
              <CardStackComponent />
              <AIModelPicker />
              <MergedComponent />
              {/* < QnAUI /> */}
              <ParallaxGallery />
              <CompleteFightMisinformationSection />
              {/* <TruthGuard /> */}
            </div>
          }
        />

        {/* Generate Page */}
        <Route path="/truthGuard" element={<div>
          <TruthGuard />
        </div>} />
      </Routes>
  );
}

export default App;
