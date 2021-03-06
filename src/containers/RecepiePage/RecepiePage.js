import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import uuid from 'uuid';
import moment from 'moment';

class RecepiePage extends Component {
  state = {
    editName: false,
    editDescription: false,
    editIngredients: false,
    editCalories: false,
  }

  getRecepie = () => {
    const recepie = this.props.recepies.find(recepie => recepie.id === this.props.match.params.id);
    return recepie
  }

  changeToEditModeRecepie = (type) => {
    const { editName, editDescription, editIngredients, editCalories } = this.state
    if (type === 'name') this.setState({ editName: !editName, editDescription: false, editIngredients: false, editCalories: false })
    if (type === 'description') this.setState({ editDescription: !editDescription, editName: false, editIngredients: false, editCalories: false })
    if (type === 'ingredients') this.setState({ editIngredients: !editIngredients, editDescription: false, editName: false, editCalories: false })
    if (type === 'calories') this.setState({ editCalories: !editCalories, editDescription: false, editIngredients: false, editName: false })
  }

  changeRecepieValue = (e, type, ingId) => {
    e.preventDefault()
    const recepie = this.getRecepie();
    const currentDate = moment().format("DD.MM.YY HH:mm:ss");
    recepie.modificationDate = currentDate;
    switch (type) {
      case 'calories': if (e.target.value >= 0 && e.target.value <= 9998) recepie.calories = e.target.value;
        break;
      case 'name': recepie.name = e.target.value;
        break;
      case 'description': recepie.description = e.target.value;
        break;
      case 'preparation': recepie.preparation = e.target.value;
        break;
      case 'addIngredient':
        const id = uuid()
        recepie.ingredients.push({ id, name: e.target.Ingredient.value })
        e.target.Ingredient.value = '';
        break;
      case 'deleteIngredient':
        const index = recepie.ingredients.findIndex(ing => ing.id === ingId)
        recepie.ingredients.splice(index, 1);
        break
      default: return recepie
    }
    this.props.changeRecepieValues(recepie)
  }

  render() {
    const recepie = this.getRecepie()
    let content;
    if (!recepie) content = <Spinner />
    else {
      content = (
        <div className="recepie-page" >
          <div className={this.props.open ? 'include-menu-box open' : 'include-menu-box'}>
            <div className="heading-box u-margin-bottom-small u-heading-margin-top">
              <h2 className="heading-secondary">Recepie</h2>
            </div>
            <div className="recepie-page__box">
              <div className="recepie-page__edit-box">
                <div className="recepie-page__backdrop" onClick={() => this.changeToEditModeRecepie('calories')}></div>
                <h3 className="heading-quaternary">Calories <span className="recepie-page__edit">Edit</span></h3>
                {this.state.editCalories ?
                  <Input class="input input--calories" type="number" value={recepie.calories} changed={(e) => this.changeRecepieValue(e, 'calories')} /> :
                  <p className="recepie-page__text">{recepie.calories}</p>}
              </div>
              <div className="recepie-page__edit-box">
                <div className="recepie-page__backdrop" onClick={() => this.changeToEditModeRecepie('name')}></div>
                <h3 className="heading-quaternary">Name <span className="recepie-page__edit">Edit</span></h3>
                {this.state.editName ?
                  <Input class="input" value={recepie.name} changed={(e) => this.changeRecepieValue(e, 'name')} /> :
                  <p className="recepie-page__name">{recepie.name}</p>}
              </div>
              <div className="recepie-page__edit-box">
                <div className="recepie-page__backdrop" onClick={() => this.changeToEditModeRecepie('description')}></div>
                <h3 className="heading-quaternary">Description <span className="recepie-page__edit">Edit</span></h3>
                {this.state.editDescription ?
                  <Input class="input" value={recepie.description} changed={(e) => this.changeRecepieValue(e, 'description')} /> :
                  <p className="recepie-page__text">{recepie.description}</p>}
              </div>
              <div className="recepie-page__edit-box">
                <div className="recepie-page__backdrop" onClick={() => this.changeToEditModeRecepie('ingredients')}></div>
                <h3 className="heading-quaternary">Ingredients <span className="recepie-page__edit">Edit</span></h3>
                {this.state.editIngredients &&
                  <form className="recepie-page__ingredients-form" onSubmit={(e) => this.changeRecepieValue(e, 'addIngredient')}>
                    <Input class="input input--add-recepie" name="Ingredient" required={true} />
                    <Button class="btn btn--add-ingredient">Add</Button>
                  </form>}
                <ul className="recepie-page__ingredients-list">
                  {recepie.ingredients.map(ing => ing.name &&
                    <li key={ing.id} className="recepie-page__ingredients-list__ingredient">
                      {this.state.editIngredients &&
                        <Button class="btn" clicked={(e) => this.changeRecepieValue(e, 'deleteIngredient', ing.id)}><span className="recepie-page__delete-icon far fa-trash-alt"></span></Button>}
                      {ing.name}
                    </li>)}
                </ul>
              </div>
              <div className="recepie-page__edit-box">
                <h3 className="heading-quaternary">Preparation <span className="recepie-page__edit">Edit</span></h3>
                <div className="input-box">
                  <textarea
                    className="input input--textarea"
                    onChange={(e) => this.changeRecepieValue(e, 'preparation')}
                    value={recepie.preparation}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <>
        {content}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    recepies: state.recepies.recepiesList,
    open: state.open.navOpen,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeRecepieValues: (recepie, token) => { dispatch(actions.changeRecepieValues(recepie, token)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecepiePage);
