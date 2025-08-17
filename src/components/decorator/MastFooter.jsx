const MastFooter = () => {
  return (
    <footer style={{
      backgroundColor: '#495E57',
      color: '#fff',
      textAlign: 'center',
      padding: '1.5rem',
      marginTop: 'auto',
      boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
    }}>
      <p style={{
        margin: 0,
        fontSize: '1rem',
        fontWeight: '700',
        fontFamily: 'Karla, sans-serif'
      }}>
        Copyright {new Date().getFullYear()} Little Lemon
      </p>
    </footer>
  )
}

export default MastFooter;