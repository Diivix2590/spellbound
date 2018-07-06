import CharacterHeaderComponent from 'components/characters/CharacterHeader';
import CharacterMetaTableComponent from 'components/characters/CharacterMetaTable';
import CompendiumMenu from 'components/CompendiumMenu';
import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Card, Menu } from 'semantic-ui-react';
import { isUndefined } from 'util';
import { deleteCharacter, updateCharacter } from '../../actions/characters/actions';
import CharacterEditablePopupComponent from '../../components/characters/CharacterEditablePopup';
import SpellCard from '../../components/spells/SpellCard';
import { ICharacter, IStoreState } from '../../models';
import { getCharacter } from '../../selectors';

interface ICharacterComponentStateProps {
  character: ICharacter;
}

interface ICharacterComponentDispatchProps {
  changeRoute: (routeName: string) => {};
  deleteCharacter: (characterId: string) => {};
  updateCharacter: (characterId: string, characterName?: string, characterClass?: string, characterLevel?: number, characterDescription?: string) => {};
}

interface IProps extends ICharacterComponentStateProps, ICharacterComponentDispatchProps {
  match: any;
}

class CharacterCompoent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    if (isUndefined(this.props.character)) {
      this.props.changeRoute('/Error');
    }
  }

  public render() {
    const spellCards = isUndefined(this.props.character.spells)
      ? null
      : this.props.character.spells.map(spell => <SpellCard key={spell._id} name={spell.name} level={spell.level} school={spell.school} />);

    return (
      <div>
        <CharacterEditablePopupComponent
          isCreate={false}
          trigger={<div><CharacterHeaderComponent characterName={this.props.character.name} /></div>}
          characterId={this.props.character._id}
          name={this.props.character.name}
          classType={this.props.character.classType}
          level={this.props.character.level}
          description={this.props.character.description}
          update={this.props.updateCharacter}
          delete={this.props.deleteCharacter}
        />

        <CharacterMetaTableComponent
          characterClass={this.props.character.classType}
          characterLevel={this.props.character.level}
          characterDescription={this.props.character.description}
        />

        <CompendiumMenu>
          <Menu.Item disabled={true} name="Equiped Spells" position="left" icon="lightning" />
        </CompendiumMenu>
        <Card.Group doubling={true} stackable={true} itemsPerRow={4}>
          {/* TODO: if null, insert picture */}
          {spellCards}
        </Card.Group>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState, props: IProps): ICharacterComponentStateProps {
  return {
    character: getCharacter(state, props.match.params.id)
  };
}

const mapDispatchToProps = (dispatch: any): ICharacterComponentDispatchProps => {
  return {
    changeRoute: (routeName: string) => dispatch(push(routeName)),
    deleteCharacter: (id: string) => dispatch(deleteCharacter(id)),
    updateCharacter: (id: string, name: string, classType?: string, level?: number, description?: string) => dispatch(updateCharacter(id, name, classType, level, description))
  };
};

const Character = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterCompoent);

export default Character;
