import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "react-materialize";

class MyComponent extends Component {
  renderPageContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className="center">
            <h4>Welcome to the BU Exceptional Circumstances portal</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum dignissim congue est, nec egestas lectus consectetur
              sed. Pellentesque porttitor enim eleifend turpis dictum, sit amet
              tincidunt nisi suscipit. Vivamus et turpis auctor, pellentesque
              orci vel, scelerisque ipsum. Proin placerat euismod dictum. Fusce
              convallis eget ipsum non semper. Donec sit amet molestie nisl. Ut
              vitae orci et augue iaculis ultrices. Morbi interdum est quis
              turpis rhoncus posuere et at ipsum. Sed suscipit, lectus a maximus
              mattis, neque nulla eleifend orci, at semper mauris tortor in
              lectus. Curabitur mollis placerat sapien, ac volutpat neque
              maximus ut. Aliquam blandit non dolor et pharetra.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci
              varius natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Ut sit amet finibus ex. Nulla a augue at urna
              elementum dignissim. Nunc tristique molestie nunc at tincidunt.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              in magna consequat, imperdiet nibh at, luctus tellus. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Vivamus ornare rutrum ante in tempus. Maecenas
              molestie, neque et gravida cursus, ipsum lacus sodales turpis, sit
              amet dignissim augue ex vel elit. Integer lobortis libero vitae
              est scelerisque, at semper neque tincidunt. Mauris vitae eleifend
              orci, et cursus libero.
            </p>
            <a href="/auth/google">
              <Button className="red" large>
                <Icon left>verified_user</Icon>Sign in with Google
              </Button>
            </a>
          </div>
        );
      default:
        return (
          <div className="center">
            <h4>Welcome to the BU Exceptional Circumstances portal</h4>
            <p>Great! Now you're signed in feel free to navigate the application using the top bar (or pop-out sidebar if you're on mobile!)</p>
          </div>
        );
    }
  }
  render() {
    return <div>{this.renderPageContent()}</div>;
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);
