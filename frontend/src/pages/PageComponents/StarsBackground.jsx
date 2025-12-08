const StarsBackground = ({ stars }) => (
  <>
    <style>
      {`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}
    </style>
    {stars.map((star, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          backgroundColor: '#fff',
          borderRadius: '50%',
          left: star.left,
          top: star.top,
          width: `${star.size}px`,
          height: `${star.size}px`,
          opacity: star.opacity,
          zIndex: 1
        }}
      />
    ))}
  </>
);

export default StarsBackground;