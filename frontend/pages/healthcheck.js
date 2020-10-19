// health check URL
function Healthcheck() {
}

// This gets called on every request
export async function getServerSideProps(context) {
  context.res.end('OK');
  return { props: { } }
}

export default Healthcheck;