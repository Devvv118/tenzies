export default function Die(props: any) {
  return (
    <div className={props.freeze?"frozen die":"die"} onClick={()=>props.toggle(props.id,props.freeze)}>
      <h1>{props.value}</h1>
    </div>
  )
}