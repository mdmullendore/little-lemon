import restaurantImage from "../../assets/mediterrian-food.png";

const TwoColumnCallout = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      alignItems: 'center',
      padding: '3rem 0',
      marginBottom: '3rem'
    }}>
      {/* Left Column - Content */}
      <div style={{
        paddingRight: '2rem'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '900',
          color: '#495E57',
          marginBottom: '1.5rem',
          fontFamily: 'Markazi Text'
        }}>
          Our Story
        </h2>
        
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.7',
          color: '#333',
          marginBottom: '1.5rem',
          fontFamily: 'Karla, sans-serif'
        }}>
          Little Lemon was founded in 2010 by the Rossi family, bringing authentic 
          Mediterranean cuisine to the vibrant city of Chicago. Our passion for 
          fresh, locally-sourced ingredients and traditional recipes has made us 
          a beloved destination for food lovers.
        </p>
        
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.7',
          color: '#333',
          marginBottom: '2rem',
          fontFamily: 'Karla, sans-serif'
        }}>
          From our signature lemon-infused dishes to our warm, family-friendly 
          atmosphere, we invite you to experience the true taste of the 
          Mediterranean right here in the heart of the Midwest.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{
            backgroundColor: '#EDEFEE',
            color: '#495E57',
            padding: '0.5rem 1rem',
            borderRadius: '16px',
            fontSize: '0.9rem',
            fontWeight: '900',
            fontFamily: 'Karla, sans-serif',
            textTransform: 'uppercase'
          }}>
            Family Owned
          </div>
          <div style={{
            backgroundColor: '#EDEFEE',
            color: '#495E57',
            padding: '0.5rem 1rem',
            borderRadius: '16px',
            fontSize: '0.9rem',
            fontWeight: '900',
            fontFamily: 'Karla, sans-serif',
            textTransform: 'uppercase'
          }}>
            Fresh Ingredients
          </div>
          <div style={{
            backgroundColor: '#EDEFEE',
            color: '#495E57',
            padding: '0.5rem 1rem',
            borderRadius: '16px',
            fontSize: '0.9rem',
            fontWeight: '900',
            fontFamily: 'Karla, sans-serif',
            textTransform: 'uppercase'
          }}>
            Authentic Recipes
          </div>
        </div>
      </div>
      
      {/* Right Column - Image */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          width: '100%',
          height: '400px',
          backgroundColor: '#f3f3f3',
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Placeholder for restaurant image */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#495E57'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem'
            }}>
              🍋
            </div>
              <img src={restaurantImage} alt="Mediterrian food is yummy" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwoColumnCallout;