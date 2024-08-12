import React from "react";
import PropTypes from "prop-types";

function VideoPlayer({ videoUrl }) {
  return (
    <div>
      <h3>Video Player</h3>
      <video controls width="600">
        <source src={videoUrl} type="application/x-mpegURL" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default VideoPlayer;
