import React from 'react';
import TableauEmbed from './TableauEmbed/TableauEmbed';

function Health(props) {
  return props.connectors.map((connector, index) => {
    return (
        <TableauEmbed
          key={connector.id}
          id={connector.id}
          name={connector.name}
          url={'https://clientreporting.theinformationlab.co.uk/t/PublicDemo/views/WDCHealthAnalysis/WDCHealth'}
        />
    );
  });
}

export default Health;
