import React, { useState, useEffect,useRef } from 'react';

const AudioPlayer = ( routeData ) => {
  const [audioSrc, setAudioSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef(null);
  
  const [optimizedData, setOptimizedData] = useState(null);

  // 与后端交互
  const handleSendRouteData = () => {
    console.log("Route Data:", routeData); // Debug: log the route data

    if (routeData && routeData.routeData && routeData.routeData.features) {
    const { features } = routeData.routeData;
    const optimizedData = features.map(feature => {
      const { properties, geometry } = feature;
      const { segments, extras } = properties;
  
      // 提取关键的段落信息
      const relevantSegments = segments.map(segment => ({
        distance: segment.distance,
        duration: segment.duration,
        steps: segment.steps.map(step => ({
          distance: step.distance,
          duration: step.duration,
          instruction: step.instruction,
          type: step.type
        })),
        ascent: segment.ascent,
        descent: segment.descent
      }));
  
      // 提取表面和坡度信息
      const relevantExtras = {
        surface: extras.surface.values.map(s => ({
          from: s[0],
          to: s[1],
          type: s[2]
        })),
        steepness: extras.steepness.values.map(s => ({
          from: s[0],
          to: s[1],
          level: s[2]
        }))
      };
  
      return {
        geometry,
        segments: relevantSegments,
        extras: relevantExtras
      };
    });
    setOptimizedData(optimizedData);
    }
  };

  useEffect(() => {
    if (routeData) {
        handleSendRouteData();
    }
  }, [routeData]);

  const AnimatedIcon = ({ loading, onClick }) => {
    const style = { cursor: 'pointer', width: '50px', height: '50px' }; 
    // if (!audioSrc){
        if (loading) {
            return (
                <div onClick={onClick} style={style}>
                    <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%' }}>
                        <source src="/play.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        } else {
            return <video src="/play.mp4" preload="metadata" onClick={onClick}  style={style} />;
        }
    // } else {
    //     return null;
    // }
};

  const handleFetchAudio = async () => {
    console.log('this is data',optimizedData)
    setLoading(true);
    setError('');
    try {
        const response = await fetch('https://melbourneunbound.com/api/process-text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ optimizedData })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioSrc(url);
      } catch (error) {
        console.error('Failed to fetch audio:', error);
        setError('Failed to load audio.');
      } finally {
        setLoading(false);
      }
  };

  return (
    <div>
      <AnimatedIcon loading={loading} onClick={handleFetchAudio} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {audioSrc && (
        <audio 
          controls 
          src={audioSrc} 
          style={{ width: '100%' }} 
          ref={audioRef}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
            }
          }}
        >
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;
