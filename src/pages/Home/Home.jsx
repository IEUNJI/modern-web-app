import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { MotionScreen, MotionScene, SharedElement, useMotion } from 'react-motion-layout';

import avatar from 'assets/avatar.png';
import './Home.less';

function Home() {
  const history = useHistory();
  const withTransition = useMotion('editor-motion');
  const callback = useCallback(() => history.push('/editor'));

  return (
    <MotionScreen>
      <div id="home-page">
        <MotionScene name="editor-motion" onClick={withTransition(callback)}>
          <div className="editor-router-link">
            <SharedElement.Image
              src={avatar}
              className="editor-motion-image"
              animationKey="editor-motion-image"
            />
            <SharedElement.Text
              className="editor-motion-text"
              animationKey="editor-motion-text"
            >
              图片编辑页
            </SharedElement.Text>
          </div>
        </MotionScene>
      </div>
    </MotionScreen>
  );
}

export default Home;
