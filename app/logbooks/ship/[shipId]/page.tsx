export default function ShipPage({ params }: { params: { shipId: string } }) {
  return <div>Страница судна с ID: {params.shipId}</div>;
}