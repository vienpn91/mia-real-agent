import React from 'react';
import EntityRow from './EntityRow';
import {
  EntityListWrapper,
  EntityListHeader,
  EntityTable,
  EntityTableHeader,
  EntityTableHeaderCell,
  EntityTableRow,
} from './styles';

const EntityList = () => (
  <EntityListWrapper>
    <EntityListHeader>Mia is using 6 entities</EntityListHeader>
    <EntityTable>
      <EntityTableHeader>
        <EntityTableRow>
          <EntityTableHeaderCell>
            Entity
          </EntityTableHeaderCell>
          <EntityTableHeaderCell>
            Description
          </EntityTableHeaderCell>
          <EntityTableHeaderCell>
            Value
          </EntityTableHeaderCell>
        </EntityTableRow>
      </EntityTableHeader>
      <tbody>
        <EntityRow
          entityName="learningName"
          lookupStrategy="free-text & keywords"
          description="User-defined entity"
          values={[
            'javascript',
            'jquery',
          ]}
        />
        <EntityRow
          entityName="emotion"
          entityTheme="rgba(208, 251, 237, 0.5)"
          lookupStrategy="free-text & keywords"
          description="User-defined entity"
          values={[
            'javascript',
            'jquery',
          ]}
        />
        <EntityRow
          entityName="swear_word"
          entityTheme="rgba(215, 208, 251, 0.5)"
          lookupStrategy="free-text & keywords"
          description="User-defined entity"
          values={[
            'javascript',
            'jquery',
          ]}
        />
        <EntityRow
          entityName="wit/wolfram_search_query"
          entityTheme="rgba(237, 208, 251, 0.5)"
          description="Captures free text that's a typical query for Wolfram Alpha, like `distance between the Earth and the moon`."
        />
      </tbody>
    </EntityTable>
  </EntityListWrapper>
);

export default EntityList;
