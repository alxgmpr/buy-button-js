import sinon from 'sinon';
const { module, test } = QUnit;
import Iframe from '../../src/iframe';

let iframe;
const parent = document.getElementById('qunit-fixture');

module('Unit | Iframe', {
  beforeEach() {
    iframe = new Iframe(parent, {
      button: 'btn'
    }, {
      button: {
        'color': 'red',
        ':hover': {
          'color': 'green'
        }
      }
    });
  },
  afterEach() {
    iframe = null;
  }
});

test('it appends an iframe on #load', (assert) => {
  const done = assert.async();
  iframe.appendStyleTag = function () {
    assert.ok(true);
  };

  iframe.load().then(() => {
    const childDiv = parent.children[0];
    assert.equal(childDiv.tagName, 'DIV');
    assert.equal(childDiv.children[0].tagName, 'IFRAME');
    done();
  });
});

test('it returns custom styles object on #customStyles', (assert) => {
  const testStyles = [{
    selector: '.btn',
    declarations: [
      {
        property: 'color',
        value: 'red'
      }
    ]
  }, {
    selector: '.btn:hover',
    declarations: [
      {
        property: 'color',
        value: 'green'
      }
    ]
  }]

  assert.deepEqual(iframe.customStyles, testStyles);
});

test('it properly formats default styles on #defaultStyles', (assert) => {
  const firstStyle = iframe.defaultStyles[0];
  assert.ok(firstStyle.selector);
  assert.ok(firstStyle.declarations[0].property);
  assert.ok(firstStyle.declarations[0].value);
});

test('it appends a style tag', (assert) => {
  const done = assert.async();
  iframe.load().then(() => {
    const headTag = iframe.el.contentDocument.head.children[0];
    assert.equal(headTag.tagName, 'STYLE');
    assert.ok(headTag.innerHTML);
    done();
  });
});
