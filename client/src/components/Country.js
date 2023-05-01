import Flag from 'react-flagkit';

function Country(props) {
    return (
      <div className="flex text-center my-1">
        <Flag country={props.code} size={15} className="mr-2 ml-1"/>
        <span>{props.name}</span>
      </div>
    );
}

export default Country;