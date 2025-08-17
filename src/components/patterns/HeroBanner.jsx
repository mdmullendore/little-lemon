const HeroBanner = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #495E57 0%, #333 100%)',
      color: '#fff',
      padding: '4rem 2rem',
      borderRadius: '15px',
      textAlign: 'center',
      marginBottom: '3rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        backgroundColor: '#f4ce14',
        borderRadius: '50%',
        opacity: '0.1',
        transform: 'rotate(45deg)'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '-30px',
        width: '150px',
        height: '150px',
        backgroundColor: '#f4ce14',
        borderRadius: '50%',
        opacity: '0.1'
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 2
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#f4ce14',
          fontFamily: 'Markazi Text'
        }}>
          Little Lemon
        </h1>
        
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: '#fff',
          fontFamily: 'Karla, sans-serif',
          textTransform: 'uppercase'
        }}>
          Mediterranean Cuisine
        </h2>
        
        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.6',
          marginBottom: '2.5rem',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          color: '#f3f3f3',
          fontFamily: 'Karla, sans-serif'
        }}>
          Experience authentic Mediterranean flavors in the heart of Chicago. 
          Fresh ingredients, traditional recipes, and warm hospitality.
        </p>
        
        <a 
          href="/bookings" 
          style={{
            display: 'inline-block',
            backgroundColor: '#f4ce14',
            color: '#495E57',
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: '900',
            transition: 'all 0.3s ease',
            border: '3px solid #f4ce14',
            fontFamily: 'Karla, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#495E57';
            e.target.style.color = '#f4ce14';
            e.target.style.borderColor = '#495E57';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f4ce14';
            e.target.style.color = '#495E57';
            e.target.style.borderColor = '#f4ce14';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Reserve Your Table
        </a>
      </div>
    </div>
  )
}

export default HeroBanner;