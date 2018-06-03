import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Card, Loader, Menu } from 'semantic-ui-react';
import { isNull } from 'util';
import { getUserData } from '../actions/user/userActions';
import CharacterCard from '../components/characters/CharacterCard';
import { IStoreState, IUserData } from '../models';
import { isBusy } from '../selectors';

interface IUserDashboardStateProps {
  isAuthenticated: boolean;
  isBusy: boolean;
  userData: IUserData | null;
}

interface IUserDashboardDispatchProps {
  // tslint:disable-next-line:ban-types
  getUserData: Function;
}

class UserDashboardComponent extends React.Component<IUserDashboardStateProps & IUserDashboardDispatchProps, {}> {
  constructor(props: IUserDashboardStateProps & IUserDashboardDispatchProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.getUserData();
  }

  public handleCreateCharacter = () => {
    alert('hello');
  };

  public render() {
    // Return imediately if we're busy or the filters or spell are undefined.
    if (this.props.isBusy || isNull(this.props.userData)) {
      return <Loader active={true} inline="centered" size="big" />;
    }

    const sortedCharacters = _.sortBy(this.props.userData.characters, ['dateLastModified', 'name']);
    const characterCards = sortedCharacters.map(character => <CharacterCard key={character._id} character={character} />);

    return (
      <div>
        <div>
          <Menu borderless={true} pointing={true} secondary={true}>
            <Menu.Item disabled={true} name="Characters" position="left" icon="users" />

            <Menu.Menu position="right">
              <Menu.Item name="Create" icon="plus" />
            </Menu.Menu>
          </Menu>
          <Card.Group doubling={true} stackable={true} itemsPerRow={4}>
            {characterCards}
          </Card.Group>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState): IUserDashboardStateProps {
  return {
    isAuthenticated: state.isAuthenticated,
    isBusy: isBusy(state),
    userData: state.userData
  };
}

function mapDispatchToProps(dispatch: any): IUserDashboardDispatchProps {
  return {
    getUserData: () => dispatch(getUserData())
  };
}

const UserDashboard = connect(mapStateToProps, mapDispatchToProps)(UserDashboardComponent);
export default UserDashboard;
