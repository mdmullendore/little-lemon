import logoImg from "../../assets/Logo.svg";

const MastHead = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#f3f3f3',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <a href="/" style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center'
      }}>
        <img 
          src={logoImg} 
          alt="Little Lemon" 
          style={{
            height: '50px',
            width: 'auto',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        />
      </a>
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        gap: '2rem',
        alignItems: 'center'
      }}> 
        <li>
          <a 
            href="/bookings" 
            style={{
              textDecoration: 'none',
              color: '#495E57',
              fontFamily: 'Karla, sans-serif',
              fontWeight: '600',
              fontSize: '1.1rem',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              transition: 'all 0.3s ease',
              backgroundColor: 'transparent',
              border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#495E57';
              e.target.style.color = '#f4ce14';
              e.target.style.borderColor = '#495E57';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#495E57';
              e.target.style.borderColor = 'transparent';
            }}
          >
            Bookings
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default MastHead;