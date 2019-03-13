import React from 'react';
import Connector from './Connector/Connector';

const connectors = (props) => {

  return props.connectors.map((connector, index) => {
    return (
        <Connector
          key={connector.id}
          name={connector.name}
          image={connector.image}
          url={connector.url}
          description={connector.description}
          downloads={connector.downloads}
          views={connector.views}
        />
    );
  });
}

export default connectors;
