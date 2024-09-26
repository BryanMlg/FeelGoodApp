const Dashboard = () => {
  return (
    <div
      style={{
        borderRadius: '10px',
        overflow: 'hidden', // Esconde contenido sobresaliente
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Sombra suave
        margin: '20px 0', // Espaciado
      }}
    >
      <iframe
        title='DataFeelGoodRelacionado'
        width='100%'
        height='600px'
        src='https://app.powerbi.com/view?r=eyJrIjoiMWE5NzIyYjUtZDg5YS00MzkwLWI5YmUtNjYyNDFkZWRlOGY1IiwidCI6IjVmNTNiNGNlLTYzZDQtNGVlOC04OGQyLTIyZjBiMmQ0YjI3YSIsImMiOjR9'
        allowFullScreen='true'
        style={{
          border: 'none', // Eliminar borde por defecto
          borderRadius: '10px', // Bordes redondeados
        }}
      ></iframe>
    </div>
  )
}

export default Dashboard
