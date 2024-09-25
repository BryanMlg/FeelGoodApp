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
      title="Power BI Report"
      width="100%"
      height="600px"
      src={'https://app.powerbi.com/reportEmbed?reportId=a14c074c-2315-4dce-a4a6-e5fb57d2b2be&autoAuth=true&ctid=5f53b4ce-63d4-4ee8-88d2-22f0b2d4b27a'}
      allowFullScreen="true"
      style={{
        border: 'none', // Eliminar borde por defecto
        borderRadius: '10px', // Bordes redondeados
      }}
    ></iframe>
  </div>
  );
};

export default Dashboard;
