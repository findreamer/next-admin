import { getToken, remveToken, setToken } from "@/utils";
import { create } from "zustand";
import { login, getInfo, logout } from "@/api";
import DefaultAvatar from "@/assets/images/profile.jpg";

export type State = {
  token: string;
  name: string;
  avatar: string;
  roles: string[];
  permissions: string[];
};

export type Actions = {
  login: (params: Parameters<typeof login>[0]) => void;
  getInfo: () => {};
  logout: () => void;
};
export const useUserStore = create<State & Actions>((set) => ({
  token: getToken() || "",
  name: "",
  avatar: "",
  roles: [],
  permissions: [],
  async login(data) {
    try {
      const res = await login(data);
      if (res.data.status === 200) {
        set({ token: res.data.data.token });
        setToken(res.data.data.token);
      }
    } catch (error) {}
  },
  async getInfo() {
    try {
      const res = (await getInfo()) as any;
      const user = res.user;
      const avatar = user.avatar || DefaultAvatar;
      let roles = [];
      let permissions = [];
      if (res.roles && res.roles.length > 0) {
        // 验证返回的roles是否是一个非空数组
        roles = res.roles;
        permissions = res.permissions;
      } else {
        roles = ["ROLE_DEFAULT"];
      }
      const info = {
        roles,
        permissions,
        name: user.userName,
        avatar,
      };
      set(info);
      return info;
    } catch (error) {
      console.log(error);
    }
  },
  async logout() {
    try {
      await logout();
      set({ token: "", roles: [], permissions: [] });
      remveToken();
    } catch (error) {
      console.log(error);
    }
  },
}));
var _excluded = ["components"];

function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

/* @jsxRuntime classic */

/* @jsx mdx */
var _frontmatter = {
  title: "Build your own React",
  date: "2019-11-13T00:00:00.000Z",
  responsive: true,
};
var layoutProps = {
  _frontmatter: _frontmatter,
};
var MDXLayout = "wrapper";
return function MDXContent(_ref) {
  var components = _ref.components,
    props = _objectWithoutProperties(_ref, _excluded);

  return mdx(
    MDXLayout,
    _extends({}, layoutProps, props, {
      components: components,
      mdxType: "MDXLayout",
    }),
    mdx(
      "p",
      null,
      "We are going to rewrite React from scratch. Step by step. Following the architecture from the real React code but without all the optimizations and non-essential features."
    ),
    mdx(
      "p",
      null,
      "If you\u2019ve read any of ",
      mdx(
        "a",
        {
          parentName: "p",
          href: "https://engineering.hexacta.com/didact-learning-how-react-works-by-building-it-from-scratch-51007984e5c5",
        },
        "my previous \u201Cbuild your own React\u201D posts"
      ),
      ", the difference is that this post is based on React 16.8, so we can now use hooks and drop all the code related to classes."
    ),
    mdx(
      "p",
      null,
      "You can find the history with the old blog posts and the code on the ",
      mdx(
        "a",
        {
          parentName: "p",
          href: "https://github.com/pomber/didact",
        },
        "Didact repo"
      ),
      ". There\u2019s also a ",
      mdx(
        "a",
        {
          parentName: "p",
          href: "https://youtu.be/8Kc2REHdwnQ",
        },
        "talk covering the same content"
      ),
      ". But this is a self-contained post. "
    ),
    mdx(
      "p",
      null,
      "Starting from scratch, these are all the things we\u2019ll add to our version of React one by one:"
    ),
    mdx(
      "ul",
      null,
      mdx(
        "li",
        {
          parentName: "ul",
        },
        mdx(
          "strong",
          {
            parentName: "li",
          },
          "Step I"
        ),
        ": The ",
        mdx(
          "inlineCode",
          {
            parentName: "li",
          },
          "createElement"
        ),
        " Function"
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        mdx(
          "strong",
          {
            parentName: "li",
          },
          "Step II"
        ),
        ": The ",
        mdx(
          "inlineCode",
          {
            parentName: "li",
          },
          "render"
        ),
        " Function"
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        mdx(
          "strong",
          {
            parentName: "li",
          },
          "Step III"
        ),
        ": Concurrent Mode"
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        mdx(
          "strong",
          {
            parentName: "li",
          },
          "Step IV"
        ),
        ": Fibers"
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        mdx(
          "strong",
          {
            parentName: "li",
          },
          "Step V"
        ),
        ": Render and Commit Phases"
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        mdx(
          "strong",
          {
            parentName: "li",
          },
          "Step VI"
        ),
        ": Reconciliation"
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        mdx(
          "strong",
          {
            parentName: "li",
          },
          "Step VII"
        ),
        ": Function Components"
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        mdx(
          "strong",
          {
            parentName: "li",
          },
          "Step VIII"
        ),
        ": Hooks"
      )
    ),
    mdx(
      CodeWave,
      {
        mdxType: "CodeWave",
      },
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
          },
          'const element = <h1 title="foo">Hello</h1>\nconst container = document.getElementById("root")\nReactDOM.render(element, container)\n'
        )
      ),
      mdx(
        "h3",
        {
          id: "step-zero-review",
        },
        "Step Zero: Review"
      ),
      mdx(
        "p",
        null,
        "But first let\u2019s review some basic concepts. You can skip this step if you already have a good idea of how React, JSX and DOM elements work."
      ),
      mdx(
        "p",
        null,
        "We\u2019ll use this React app, just three lines of code. The first one defines a React element. The next one gets a node from the DOM. The last one renders the React element into the container."
      ),
      mdx(
        "p",
        null,
        mdx(
          "strong",
          {
            parentName: "p",
          },
          "Let\u2019s remove all the React specific code and replace it with vanilla JavaScript"
        ),
        "."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            "1": true,
            className: "language-jsx",
            metastring: "1",
          },
          'const element = <h1 title="foo">Hello</h1>\nconst container = document.getElementById("root")\nReactDOM.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "On the first line we have the element, defined with JSX. It isn\u2019t even valid JavaScript, so in order to replace it with vanilla JS, first we need to replace it with valid JS."
      ),
      mdx(
        "p",
        null,
        "JSX is transformed to JS by build tools like Babel. The transformation is usually simple: replace the code inside the tags with a call to ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "createElement"
        ),
        ", passing the tag name, the props and the children as parameters."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
          },
          'const element = React.createElement(\n  "h1",\n  { title: "foo" },\n  "Hello"\n)\n\nconst container = document.getElementById("root")\nReactDOM.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "React.createElement"
        ),
        " creates an object from its arguments. Besides some validations, that\u2019s all it does. So we can safely replace the function call with its output."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
          },
          'const element = {\n  type: "h1",\n  props: {\n    title: "foo",\n    children: "Hello",\n  },\n}\n\nconst container = document.getElementById("root")\nReactDOM.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "And this is what an element is, an object with two properties: ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "type"
        ),
        " and ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "props"
        ),
        " (well, ",
        mdx(
          "a",
          {
            parentName: "p",
            href: "https://github.com/facebook/react/blob/f4cc45ce962adc9f307690e1d5cfa28a288418eb/packages/react/src/ReactElement.js#L111",
          },
          "it has more"
        ),
        ", but we only care about these two)."
      ),
      mdx(
        "p",
        null,
        "The ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "type"
        ),
        " is a string that specifies the type of the DOM node we want to create, it\u2019s the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "tagName"
        ),
        " you pass to ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "document.createElement"
        ),
        " when you want to create an HTML element. It can also be a function, but we\u2019ll leave that for Step VII."
      ),
      mdx(
        "p",
        null,
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "props"
        ),
        " is another object, it has all the keys and values from the JSX attributes. It also has a special property: ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "children"
        ),
        "."
      ),
      mdx(
        "p",
        null,
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "children"
        ),
        " in this case is a string, but it\u2019s usually an array with more elements. That\u2019s why elements are also trees."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            "10": true,
            className: "language-jsx",
            metastring: "10",
          },
          'const element = {\n  type: "h1",\n  props: {\n    title: "foo",\n    children: "Hello",\n  },\n}\n\nconst container = document.getElementById("root")\nReactDOM.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "The other piece of React code we need to replace is the call to ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "ReactDOM.render"
        ),
        "."
      ),
      mdx(
        "p",
        null,
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "render"
        ),
        " is where React changes the DOM, so let\u2019s do the updates ourselves."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "1,2,4,7,11,12",
            "1,2,4,7,11,12": true,
          },
          'const element = {\n  type: "h1",\n  props: {\n    title: "foo",\n    children: "Hello",\n  },\n}\n\nconst container = document.getElementById("root")\n\nconst node = document.createElement(element.type)\nnode["title"] = element.props.title\n\nconst text = document.createTextNode("")\ntext["nodeValue"] = element.props.children\n\nnode.appendChild(text)\ncontainer.appendChild(node)\n'
        )
      ),
      mdx(
        "p",
        null,
        "First we create a node",
        "*",
        " using the element ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "type"
        ),
        ", in this case ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "h1"
        ),
        "."
      ),
      mdx(
        "p",
        null,
        "Then we assign all the element ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "props"
        ),
        " to that node. Here it\u2019s just the title."
      ),
      mdx(
        "p",
        null,
        mdx(
          "em",
          {
            parentName: "p",
          },
          "*",
          " To avoid confusion, I\u2019ll use \u201Celement\u201D to refer to React elements and \u201Cnode\u201D for DOM elements."
        )
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-js",
            metastring: "1,5,7,14,15",
            "1,5,7,14,15": true,
          },
          'const element = {\n  type: "h1",\n  props: {\n    title: "foo",\n    children: "Hello",\n  },\n}\n\nconst container = document.getElementById("root")\n\nconst node = document.createElement(element.type)\nnode["title"] = element.props.title\n\nconst text = document.createTextNode("")\ntext["nodeValue"] = element.props.children\n\nnode.appendChild(text)\ncontainer.appendChild(node)\n'
        )
      ),
      mdx(
        "p",
        null,
        "Then we create the nodes for the children. We only have a string as a child so we create a text node."
      ),
      mdx(
        "p",
        null,
        "Using ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "textNode"
        ),
        " instead of setting ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "innerText"
        ),
        " will allow us to treat all elements in the same way later. Note also how we set the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "nodeValue"
        ),
        " like we did it with the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "h1"
        ),
        " title, it\u2019s almost as if the string had ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          'props: {nodeValue: "hello"}'
        ),
        "."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-js",
            metastring: "9,17,18",
            "9,17,18": true,
          },
          'const element = {\n  type: "h1",\n  props: {\n    title: "foo",\n    children: "Hello",\n  },\n}\n\nconst container = document.getElementById("root")\n\nconst node = document.createElement(element.type)\nnode["title"] = element.props.title\n\nconst text = document.createTextNode("")\ntext["nodeValue"] = element.props.children\n\nnode.appendChild(text)\ncontainer.appendChild(node)\n'
        )
      ),
      mdx(
        "p",
        null,
        "Finally, we append the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "textNode"
        ),
        " to the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "h1"
        ),
        " and the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "h1"
        ),
        " to the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "container"
        ),
        "."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-js",
            metastring: "1:18",
            "1:18": true,
          },
          'const element = {\n  type: "h1",\n  props: {\n    title: "foo",\n    children: "Hello",\n  },\n}\n\nconst container = document.getElementById("root")\n\nconst node = document.createElement(element.type)\nnode["title"] = element.props.title\n\nconst text = document.createTextNode("")\ntext["nodeValue"] = element.props.children\n\nnode.appendChild(text)\ncontainer.appendChild(node)\n'
        )
      ),
      mdx(
        "p",
        null,
        "And now we have the same app as before, but without using React."
      )
    ),
    mdx(
      CodeWave,
      {
        mdxType: "CodeWave",
      },
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./00.jsx",
            file: "./00.jsx",
          },
          'const element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nReactDOM.render(element, container)\n'
        )
      ),
      mdx(
        "h3",
        {
          id: "step-i-the-createelement-function",
        },
        "Step I: The ",
        mdx(
          "inlineCode",
          {
            parentName: "h3",
          },
          "createElement"
        ),
        " Function"
      ),
      mdx(
        "p",
        null,
        "Let\u2019s start again with another app. This time we\u2019ll replace React code with our own version of React."
      ),
      mdx(
        "p",
        null,
        "We\u2019ll start by writing our own ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "createElement"
        ),
        "."
      ),
      mdx(
        "p",
        null,
        "Let\u2019s transform the JSX to JS so we can see the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "createElement"
        ),
        " calls."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./01.jsx",
            file: "./01.jsx",
          },
          'const element = React.createElement(\n  "div",\n  { id: "foo" },\n  React.createElement("a", null, "bar"),\n  React.createElement("b")\n)\nconst container = document.getElementById("root")\nReactDOM.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "As we saw in the previous step, an element is an object with ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "type"
        ),
        " and ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "props"
        ),
        ". The only thing that our function needs to do is create that object."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./02.jsx",
            file: "./02.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children,\n    },\n  }\n}\n\nconst element = React.createElement(\n  "div",\n  { id: "foo" },\n  React.createElement("a", null, "bar"),\n  React.createElement("b")\n)\nconst container = document.getElementById("root")\nReactDOM.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "We use the ",
        mdx(
          "em",
          {
            parentName: "p",
          },
          "spread operator"
        ),
        " for the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "props"
        ),
        " and the ",
        mdx(
          "em",
          {
            parentName: "p",
          },
          "rest parameter syntax"
        ),
        " for the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "children"
        ),
        ", this way the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "children"
        ),
        " prop will always be an array."
      ),
      mdx(
        "div",
        null,
        mdx(
          "p",
          null,
          "For example, ",
          mdx(
            "inlineCode",
            {
              parentName: "p",
            },
            'createElement("div")'
          ),
          " returns:"
        ),
        mdx(
          "pre",
          null,
          mdx(
            "code",
            {
              parentName: "pre",
              className: "language-json",
            },
            '{\n  "type": "div",\n  "props": { "children": [] }\n}\n'
          )
        ),
        mdx(
          "p",
          null,
          mdx(
            "inlineCode",
            {
              parentName: "p",
            },
            'createElement("div", null, a)'
          ),
          " returns:"
        ),
        mdx(
          "pre",
          null,
          mdx(
            "code",
            {
              parentName: "pre",
              className: "language-json",
            },
            '{\n  "type": "div",\n  "props": { "children": [a] }\n}\n'
          )
        ),
        mdx(
          "p",
          null,
          "and ",
          mdx(
            "inlineCode",
            {
              parentName: "p",
            },
            'createElement("div", null, a, b)'
          ),
          " returns:"
        ),
        mdx(
          "pre",
          null,
          mdx(
            "code",
            {
              parentName: "pre",
              className: "language-json",
            },
            '{\n  "type": "div",\n  "props": { "children": [a, b] }\n}\n'
          )
        )
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./03.jsx",
            file: "./03.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nconst element = React.createElement(\n  "div",\n  { id: "foo" },\n  React.createElement("a", null, "bar"),\n  React.createElement("b")\n)\nconst container = document.getElementById("root")\nReactDOM.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "The ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "children"
        ),
        " array could also contain primitive values like strings or numbers. So we\u2019ll wrap everything that isn\u2019t an object inside its own element and create a special type for them: ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "TEXT_ELEMENT"
        ),
        "."
      ),
      mdx(
        "p",
        null,
        mdx(
          "em",
          {
            parentName: "p",
          },
          "React doesn\u2019t wrap primitive values or create empty arrays when there aren\u2019t ",
          mdx(
            "inlineCode",
            {
              parentName: "em",
            },
            "children"
          ),
          ", but we do it because it will simplify our code, and for our library we prefer simple code than performant code."
        )
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./03.jsx  25,28,29,30",
            file: "./03.jsx",
            "": true,
            "25,28,29,30": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nconst element = React.createElement(\n  "div",\n  { id: "foo" },\n  React.createElement("a", null, "bar"),\n  React.createElement("b")\n)\nconst container = document.getElementById("root")\nReactDOM.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "We are still using React\u2019s ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "createElement"
        ),
        "."
      ),
      mdx(
        "p",
        null,
        "In order to replace it, let\u2019s give a name to our library. We need a name that sounds like React but also hints its ",
        mdx(
          "em",
          {
            parentName: "p",
          },
          "didactic"
        ),
        " purpose."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./04.jsx",
            file: "./04.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nconst Didact = {\n  createElement,\n}\n\nconst element = Didact.createElement(\n  "div",\n  { id: "foo" },\n  Didact.createElement("a", null, "bar"),\n  Didact.createElement("b")\n)\nconst container = document.getElementById("root")\nReactDOM.render(element, container)\n'
        )
      ),
      mdx("p", null, "We\u2019ll call it Didact."),
      mdx(
        "p",
        null,
        "But we still want to use JSX here. How do we tell babel to use Didact\u2019s ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "createElement"
        ),
        " instead of React\u2019s?"
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./05.jsx",
            file: "./05.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nconst Didact = {\n  createElement,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nReactDOM.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "If we have a comment like this one, when babel transpiles the JSX it will use the function we define."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            "37": true,
            className: "language-jsx",
            metastring: "file=./05.jsx 37",
            file: "./05.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nconst Didact = {\n  createElement,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nReactDOM.render(element, container)\n'
        )
      ),
      mdx(
        "h3",
        {
          id: "step-ii-the-render-function",
        },
        "Step II: The ",
        mdx(
          "inlineCode",
          {
            parentName: "h3",
          },
          "render"
        ),
        " Function"
      ),
      mdx(
        "p",
        null,
        "Next, we need to write our version of the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "ReactDOM.render"
        ),
        " function."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./06.jsx 25:27,29,31,32,42",
            file: "./06.jsx",
            "25:27,29,31,32,42": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction render(element, container) {\n  // TODO create dom nodes\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "For now, we only care about adding stuff to the DOM. We\u2019ll handle updating and deleting later."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./07.jsx 25:29",
            file: "./07.jsx",
            "25:29": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction render(element, container) {\n  const dom = document.createElement(element.type)\n\n  container.appendChild(dom)\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "We start by creating the DOM node using the element type, and then append the new node to the container."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./08.jsx 25,28:30,33",
            file: "./08.jsx",
            "25,28:30,33": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction render(element, container) {\n  const dom = document.createElement(element.type)\n\n  element.props.children.forEach(child =>\n    render(child, dom)\n  )\n\n  container.appendChild(dom)\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx("p", null, "We recursively do the same for each child."),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./09.jsx",
            file: "./09.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction render(element, container) {\n  const dom =\n    element.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(element.type)\n\n  element.props.children.forEach(child =>\n    render(child, dom)\n  )\n\n  container.appendChild(dom)\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "We also need to handle text elements, if the element type is ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "TEXT_ELEMENT"
        ),
        " we create a text node instead of a regular node."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./10.jsx",
            file: "./10.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction render(element, container) {\n  const dom =\n    element.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(element.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(element.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = element.props[name]\n    })\n\n  element.props.children.forEach(child =>\n    render(child, dom)\n  )\n\n  container.appendChild(dom)\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "The last thing we need to do here is assign the element props to the node."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./10.jsx 1:58",
            file: "./10.jsx",
            "1:58": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction render(element, container) {\n  const dom =\n    element.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(element.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(element.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = element.props[name]\n    })\n\n  element.props.children.forEach(child =>\n    render(child, dom)\n  )\n\n  container.appendChild(dom)\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "And that\u2019s it. We now have a library that can render JSX to the DOM."
      ),
      mdx(
        "p",
        null,
        "Give it a try on ",
        mdx(
          "a",
          {
            parentName: "p",
            href: "https://codesandbox.io/s/didact-2-k6rbj",
          },
          "codesandbox"
        ),
        "."
      )
    ),
    mdx(
      "h3",
      {
        id: "step-iii-concurrent-mode",
      },
      "Step III: Concurrent Mode"
    ),
    mdx(
      "p",
      null,
      "But\u2026 before we start adding more code we need a refactor."
    ),
    mdx(
      CodeWave,
      {
        mdxType: "CodeWave",
      },
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./10.jsx 25,38:40,43",
            file: "./10.jsx",
            "25,38:40,43": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction render(element, container) {\n  const dom =\n    element.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(element.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(element.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = element.props[name]\n    })\n\n  element.props.children.forEach(child =>\n    render(child, dom)\n  )\n\n  container.appendChild(dom)\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx("p", null, "There\u2019s a problem with this recursive call."),
      mdx(
        "p",
        null,
        "Once we start rendering, we won\u2019t stop until we have rendered the complete element tree.\nIf the element tree is big, it may block the main thread for too long. And if the browser needs to do high priority stuff like handling user input or keeping an animation smooth, it will have to wait until the render finishes."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./11.jsx",
            file: "./11.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction render(element, container) {\n  const dom =\n    element.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(element.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(element.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = element.props[name]\n    })\n\n  element.props.children.forEach(child =>\n    render(child, dom)\n  )\n\n  container.appendChild(dom)\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(nextUnitOfWork) {\n  // TODO\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "So we are going to break the work into small units, and after we finish each unit we\u2019ll let the browser interrupt the rendering if there\u2019s anything else that needs to be done."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./11.jsx 47,55,56,58",
            file: "./11.jsx",
            "47,55,56,58": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction render(element, container) {\n  const dom =\n    element.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(element.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(element.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = element.props[name]\n    })\n\n  element.props.children.forEach(child =>\n    render(child, dom)\n  )\n\n  container.appendChild(dom)\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(nextUnitOfWork) {\n  // TODO\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "We use ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "requestIdleCallback"
        ),
        " to make a loop. You can think of ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "requestIdleCallback"
        ),
        " as a ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "setTimeout"
        ),
        ", but instead of us telling it when to run, the browser will run the callback when the main thread is idle."
      ),
      mdx(
        "p",
        null,
        mdx(
          "em",
          {
            parentName: "p",
          },
          "React ",
          mdx(
            "a",
            {
              parentName: "em",
              href: "https://github.com/facebook/react/issues/11171#issuecomment-417349573",
            },
            "doesn\u2019t use ",
            mdx(
              "inlineCode",
              {
                parentName: "a",
              },
              "requestIdleCallback"
            ),
            " anymore"
          ),
          ". Now it uses the ",
          mdx(
            "a",
            {
              parentName: "em",
              href: "https://github.com/facebook/react/tree/master/packages/scheduler",
            },
            "scheduler package"
          ),
          ". But for this use case it\u2019s conceptually the same."
        )
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./11.jsx 47,48,49,53,54,56",
            file: "./11.jsx",
            "47,48,49,53,54,56": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction render(element, container) {\n  const dom =\n    element.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(element.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(element.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = element.props[name]\n    })\n\n  element.props.children.forEach(child =>\n    render(child, dom)\n  )\n\n  container.appendChild(dom)\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(nextUnitOfWork) {\n  // TODO\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "requestIdleCallback"
        ),
        " also gives us a deadline parameter. We can use it to check how much time we have until the browser needs to take control again."
      ),
      mdx(
        "div",
        null,
        mdx(
          "p",
          null,
          mdx(
            "em",
            {
              parentName: "p",
            },
            "As of November 2019, Concurrent Mode isn\u2019t stable in React yet. The stable version of the loop looks more like this:"
          ),
          "\t"
        ),
        mdx(
          "pre",
          null,
          mdx(
            "code",
            {
              parentName: "pre",
              className: "language-js",
            },
            "while (nextUnitOfWork) {    \n  nextUnitOfWork = performUnitOfWork(   \n    nextUnitOfWork  \n  ) \n}   \n"
          )
        )
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./11.jsx 45,47,50:52,56,60:62",
            file: "./11.jsx",
            "45,47,50:52,56,60:62": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction render(element, container) {\n  const dom =\n    element.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(element.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(element.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = element.props[name]\n    })\n\n  element.props.children.forEach(child =>\n    render(child, dom)\n  )\n\n  container.appendChild(dom)\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(nextUnitOfWork) {\n  // TODO\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "To start using the loop we\u2019ll need to set the first unit of work, and then write a ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "performUnitOfWork"
        ),
        " function that not only performs the work but also returns the next unit of work."
      )
    ),
    mdx(
      "h3",
      {
        id: "step-iv-fibers",
      },
      "Step IV: Fibers"
    ),
    mdx(
      "p",
      null,
      "To organize the units of work we\u2019ll need a data structure: a fiber tree."
    ),
    mdx(
      "p",
      null,
      "We\u2019ll have one fiber for each element and each fiber will be a unit of work."
    ),
    mdx("p", null, "Let me show you with an example."),
    mdx(
      ImageWave,
      {
        mdxType: "ImageWave",
      },
      mdx(
        "p",
        null,
        mdx(
          "span",
          {
            parentName: "p",
            className: "gatsby-resp-image-wrapper",
            style: {
              position: "relative",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "274px",
            },
          },
          "\n      ",
          mdx("span", {
            parentName: "span",
            className: "gatsby-resp-image-background-image",
            style: {
              paddingBottom: "116.1904761904762%",
              position: "relative",
              bottom: "0",
              left: "0",
              backgroundImage:
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAACXBIWXMAAAsTAAALEwEAmpwYAAADlElEQVQ4y51UW2tUVxReM0lmkjRqkxjzYOqFpKAFUUShUOyDoKJPlj4V+lD/iW8BQbBSCsWC1BdNNbaoILRQaOtDhZRqrTNr7bMvR9OZMBExNjGiVU+/tc/M1EuK1QMf55y99/rW2t+6ED33eMstlLyTbm+lB999rfVXfmBUaBq/A+wH9gLbm2uFVyd03IR0gKAX0Ag7XzvCkJgWisGZN0C8Pl7diTp5jSuDrIkuEK6ChqtBVP7fhN5X2rrdTJhqIjRthIzXZMiGYM0qTqVcN4Zm2dDEvZdcO/hqO7PThqPB97eZDmVMDpm+kVTpFNYmFoVO3peXE6a2rmTvaQJuIELKLH3+RIrfzPNqrL0fLG/89i8e+Szj4gdwcmVaKLgc/xFhjO5jGPanIMzOMu3IDF2Y4zFkexf2tpy7y6OfgnCqBjmSfwmXJIYRipf3xRJxGgHT8YdCZxaY4IRskI7tWZV+R2TOSS8Iep4m88+TYmEARJuhVzEmBgmpQ/xqkBIODgJj1stgamFocdbKxpBwmyiSQuf2k2WZXvndgEgBNWqVjRIOo3QGkOlleOd7lst4r/XeFH07yna7aqvFLH8CrGy1F6Ig8bGPR70zfSih3pBHWFAZAPzzkJ5H8miuIqQJVamo2V4fAssjIbyleB9BRh/8do3+FO44O59Lodd2LomRamRwRF/+zXRivop9Ln31gGNSoAvvVg1hTHf+YGpUmS7e4a3W8Z7E87aTizxG2RSiEEwgg3KSdSAdTZHx83d5E87tx7kdcLxBPXUAet0iDBABUyVlOj/H/Tg0zIH74LlvRoSa184Hh+PytZtCIFlhPa9JvIxM4vsZUVWH7x5dosb1hMZRKnXjirjmUHZZOpsZHQCGNBnOVuiHW6yEBMckQejre/zUuLK5Rt7mwwH6dHkdDpg2Vvvaxei6gbd1+oT8P5KAsGBAeHqBlxqwEuGs6iVrlNR5U3JpXjYhOI10LfZ61clVFPzlGaZfgPFsCUIdEE10oRVHasZ0Y8oUddJoa8bI5LqWzvIZZvooE7rUEPq5wXR4KcJxHDgA7AUmF7jzx1kuHcy4oNPGpKhDlSLKIZ2nFpmOYu+nhpT1nH6/QKiafPGY6dgjHvy1xvumarzz+EMeRgapmkoXumYYkryFvh6dnBclfBNn9gC7MUD6XyCcWKjG5ORlwitR5D2zLJQE1c9E+JAXdh3S3K5oMrlHu0dt/gEnxpKtvpdlgwAAAABJRU5ErkJggg==')",
              backgroundSize: "cover",
              display: "block",
            },
          }),
          "\n  ",
          mdx("img", {
            parentName: "span",
            className: "gatsby-resp-image-image",
            alt: "Fiber Tree 0",
            title: "Fiber Tree 0",
            src: "/static/de664d437c94d478778b965c66c91f99/d3fa7/fiber0.png",
            srcSet: [
              "/static/de664d437c94d478778b965c66c91f99/79c17/fiber0.png 105w",
              "/static/de664d437c94d478778b965c66c91f99/65ed1/fiber0.png 210w",
              "/static/de664d437c94d478778b965c66c91f99/d3fa7/fiber0.png 274w",
            ],
            sizes: "(max-width: 274px) 100vw, 274px",
            style: {
              width: "100%",
              height: "100%",
              margin: "0",
              verticalAlign: "middle",
              position: "absolute",
              top: "0",
              left: "0",
            },
            loading: "lazy",
          }),
          "\n    "
        )
      ),
      mdx(
        "p",
        null,
        "Suppose we want to render an element tree like this one:"
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
          },
          "Didact.render(\n  <div>\n    <h1>\n      <p />\n      <a />\n    </h1>\n    <h2 />\n  </div>,\n  container\n)\n"
        )
      ),
      mdx(
        "p",
        null,
        "In the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "render"
        ),
        " we\u2019ll create the root fiber and set it as the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "nextUnitOfWork"
        ),
        ". The rest of the work will happen on the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "performUnitOfWork"
        ),
        " function, there we will do three things for each fiber:"
      ),
      mdx(
        "ol",
        null,
        mdx(
          "li",
          {
            parentName: "ol",
          },
          "add the element to the DOM"
        ),
        mdx(
          "li",
          {
            parentName: "ol",
          },
          "create the fibers for the element\u2019s children"
        ),
        mdx(
          "li",
          {
            parentName: "ol",
          },
          "select the next unit of work"
        )
      ),
      mdx(
        "p",
        null,
        mdx(
          "span",
          {
            parentName: "p",
            className: "gatsby-resp-image-wrapper",
            style: {
              position: "relative",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "274px",
            },
          },
          "\n      ",
          mdx("span", {
            parentName: "span",
            className: "gatsby-resp-image-background-image",
            style: {
              paddingBottom: "116.1904761904762%",
              position: "relative",
              bottom: "0",
              left: "0",
              backgroundImage:
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFQ0lEQVQ4y22UeWxUVRTGv2lnaaeV0pa2GmqRFBIwEIyCIghREkH4R4LxDxITligG2aYtQWhLF21AFGgpskiLiBIJGBDRCDaKC9UAaSM2nXn3dbbupeu8zkynZTrvHc+bFkwsk/xy7nu5871z7/nOAf7387jEA8xel4jzukU8rxOj79wyqCIWVMkcNYI+/Q9Nj8eMwCMEDeOCTzOrmZXMgrF3koFOJICqJsVSdZKJzj1hoDOpRu10kpmfLUQ0UdDV0glnW58eY50dilWI7niXs8Uouf1orr8Beh2gMli1fUijA4jTKvC8Vo5XmGXary9NFKQ8ppjZjxiyIYECu6aTf3Mc+fNAgRwMchZBOm8aouqE0ECZKWTfmByS3kkfFpsyQsr+yRME1c8mQT1phXom3cRfT9f8pVPV/iKLqhSDfIX8JQIpayzkX5tEQ+ssFLS9SEPbFlFo23wKbJkLj8fx8N5anQJUjiihL7PitaOmWWrwo/Rgf5mFlBxEeoqw9DZhzd8UzyRvaCBznn00e2MDzVnfQDPfvEsZ8Hqkh5VtaxKoubsFdbe2YLueyUqYb9YQzgYG8N1oLS6M1OkJokAKGvc4QtZce8S0w05zch2R+cy8XLv6AppdnbrYYsbawhmyL3AyXBdzOeia6m5uXepxybOv+EXmUXLGLGC1e4PHsNsxDBbC1nFsdi36rMMZRrN7iz2X3Kwf+bLAEpLxgyJmeNziVbfT/cxVxZl9in6L6Qwe5nvcic7eSmT9SdjpCLMYGVjIYIuise/cIo4FV+kZ8hr/tDbinFLDx+uDM0D6EWMRIvT5D0FV9lpJKYgnpRBjFMB1rwq2u5ouHEV3fwoLzXO7RIx+j8ovJaBPAP/VheZIGVLVwdIZYV9JKvnyObuCFM1XMJtjVFBTxmK0+g99xymw0EJuMb3N0FN7GNoJC7Sv0s1s3gwtWJbCYo89+CNj0XyF0zSlMEbzFWG4tyLakg8Kq7eTvljPTNFfdN3+wkBHgJGzj8fRIWRTpDhxZKDUqilFuD9QaiD/do4l1lFfcZqm5KMm/CMUuwt6Qc+E5WjvWpk3mEnj/Yo2+18opxa9W9AsdcZeCTagruU6qt124CfCz+3X8R7fV+/wBlRHHGwrCa1Nwnz2vogWJYWFlut32C7zHTYKdEsC13ziWZdbrHB5pPnnQ2KG7r9CKWDeKY1OzXGoT3FFs7+Vu/D9oDyX9612esSSywExC163HMvox41pccpweb1obO/gja7kptb2jHo5lHh6uCWR+rkogc2gyCIcdztj2SqWS94usEiSyyOynB458xKvdUE9y+iFjhmbrbIYeFeP4AERsKVR93NGila0IIWUPWm+/gOAjZBZS7gUkMHZQfbKuDg0duRxQZm7RkakKpWHQwJC52ea1HIeDoMl08O+4nhNt4mvMI5tM1PlSP4c/sAufB1o0wUNTSz4TVBMHF8qW0Y9boZalWDWKg1ZavDDdLU/3xz2f8ACe0DDa6H69k7jj1gjyl70Bj7G7S6BW8x+eoQgW2WMCpjoIDJJy4ujrk0x5H8bFH4ZN9qvRQcE+bdOosGNWMwPtfdk3OwWOPQowVze8BozhzlCZKxp7zHn0ojhfd8wNktkyJeHTOsayTT3DhmXdBAOktvwR7ds+b1HmCtJGCYIXhyScIq9VT0qpda3O1bVdYhln4dFxjF/M3Y33TftcFCGzaE9mSdFsvcNdqCC5Mm8ZwWz/AiJ5AmCF4JStDhdsgyeQFOaXSK+W5Jxx+3FDolHlOAhoEcHoV60oM+hF1PE816r/p9/ASn208iWI/WeAAAAAElFTkSuQmCC')",
              backgroundSize: "cover",
              display: "block",
            },
          }),
          "\n  ",
          mdx("img", {
            parentName: "span",
            className: "gatsby-resp-image-image",
            alt: "Fiber Tree 1",
            title: "Fiber Tree 1",
            src: "/static/a88a3ec01855349c14302f6da28e2b0c/d3fa7/fiber1.png",
            srcSet: [
              "/static/a88a3ec01855349c14302f6da28e2b0c/79c17/fiber1.png 105w",
              "/static/a88a3ec01855349c14302f6da28e2b0c/65ed1/fiber1.png 210w",
              "/static/a88a3ec01855349c14302f6da28e2b0c/d3fa7/fiber1.png 274w",
            ],
            sizes: "(max-width: 274px) 100vw, 274px",
            style: {
              width: "100%",
              height: "100%",
              margin: "0",
              verticalAlign: "middle",
              position: "absolute",
              top: "0",
              left: "0",
            },
            loading: "lazy",
          }),
          "\n    "
        )
      ),
      mdx(
        "p",
        null,
        "One of the goals of this data structure is to make it easy to find the next unit of work. That\u2019s why each fiber has a link to its first child, its next sibling and its parent."
      ),
      mdx(
        "p",
        null,
        mdx(
          "span",
          {
            parentName: "p",
            className: "gatsby-resp-image-wrapper",
            style: {
              position: "relative",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "274px",
            },
          },
          "\n      ",
          mdx("span", {
            parentName: "span",
            className: "gatsby-resp-image-background-image",
            style: {
              paddingBottom: "116.1904761904762%",
              position: "relative",
              bottom: "0",
              left: "0",
              backgroundImage:
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFUlEQVQ4y22VaWxUVRiG39m6zEiHKUtDJP4BEyUQIoL7SiIE/0gwJpKQiEQhRgkFEjcEiUJLW7sw07l37ixdtCyFWhZLiARDWDSAKKUwnXNn7xRah9CNtoNQOsfv3JbRWG7y5nxzc8+T91vOGeB/TzTMHigrGlFzaM0lPaK9iwTBqwzgdpLDCF79r9JidRqBhwB148A5pOWkZaRFY+8COi5bwD15Bu61mnjDDB2vnWJM+6xZ9Dubcz4RGI+F0EGi1ZiIhy3XE9HcRCxk6rzRha6rJ8DfAvgOmNNFmMZLkJOuwjPpSrxOWpw+9dJEoG3qTLy7chXmzF2AD9Z+ZCwtLbN+9vmXhqKiEpSW78QAuRji+0zD3GtJ9e4wpfxrbKnAh9PvsLUFqf7iyROAPp8PHo9HrHq3221RFGWS1+s1yi4PDjQ4yB4H71+RzW+vtPLh97L5UOHzfHj9Czy1fiEf/HgeotH2TN0SIQZvSRWk0gp49/9gIuA0n89r8TXtNbq++gZF39bglQscKy7zXJLt/Taetdk/MmtNG5+7uo0//k4rL0AsGsh0tjPIsK3rDKTgGfzMb2mO/77di5Z7Mbj7W+Ee8AuD2BIYMn7RnjJv8t83bfDzuZva7y8kzd/kH30W8XCXgL1IMneQQ/ArsI8G9IcH1UfjUfXVWJg9efg2m+nkqt7Be1B76ig2to2g0J/GJ36uScQE1kQONXeraKMtTkDeHMRr3I+WfnV2JBJ8Ix4NPtUyoM7aMvKnvvJkExw7S1HWeAzrEgS6NkowriOQrlBTmuYuwsTwvikcUowriWto6D+BpntJtN6iBlCOp0ny8YOQ3YpJkiSjLMvQJEkobjqFwstpAdZEQDWfQPMjYaYXdez/ZTt4GfDXnkVZ3K2fLnvq8921HrPkcApAriRL0zLA/yjzCAcEei5GTkm4ea4CaTkbKdlm4hJmVCiNOYrkyHJKrgebDeTSSquORgqHDzWLLDONFcdJBKtJU8WL7gt1Or4bGPJMz+HVeHxd0SGTr8FjcsoKCKSJYCJ1s91uh6P7AgYCQYiG1t5TtbNrJr1Nyhs/r+j0/4YK3gH+KaUeixobB9pxdP8BSHaHqKPm1Ol0ahkqIwF8PxhAIsiy6u8yrSn5BFoianhdZei7xpAMqDjexxaEI+rSYIQt3JtiszuoNM7yKj3B8kiTXbJsu/jrWfzUz+aFI2x5KMpebh5kTyAWUQ0kka6+I6TSyVGhJlQcG1BtkZha0JlM5O0bCU064qkfS7naCYnq51JchrPtl0AQazjKHgtF1Zk/UiyAmaKKOogmCZ3kvdq6fdv23KcptfGG5BLUIuKaGh9CIzcFEOQOakzFgeGxlMeBKp0aFXV1tfB46XJobDDQKi4Hm6vOZ6JxEUAjucsXsyjc2qt248idsADqggQ8OMQmXl+y4oI0JgOlZVXcikXEsted6fL42Jgklwv2lv0438VwvpuhmD8E6Cgqg7yrHK6SCn1lyXeTNq9aZ1A2fq2TNmyFs9KeGWSCZstbi7GLd+NcUsXZJEP5w4DNPAmFbppK3qu7wntMv/fFsqt5XKfQbaPsqRcwPcH0ssull/suYzdnujNJNfv0TZZlp3gCsJEK6xpl8NxnU/64zpZdusEW19xlBb6eVnia9xkIaCFgHs1jvj15EVWcTaZvlpKWENw2ETgU0JrTraqgG2hqnP71xFz62VVINMzj6WrjE2ltRY+fQXxD35rFnn8Af32ZCunjtxYAAAAASUVORK5CYII=')",
              backgroundSize: "cover",
              display: "block",
            },
          }),
          "\n  ",
          mdx("img", {
            parentName: "span",
            className: "gatsby-resp-image-image",
            alt: "Fiber Tree 2",
            title: "Fiber Tree 2",
            src: "/static/c1105e4f7fc7292d91c78caee258d20d/d3fa7/fiber2.png",
            srcSet: [
              "/static/c1105e4f7fc7292d91c78caee258d20d/79c17/fiber2.png 105w",
              "/static/c1105e4f7fc7292d91c78caee258d20d/65ed1/fiber2.png 210w",
              "/static/c1105e4f7fc7292d91c78caee258d20d/d3fa7/fiber2.png 274w",
            ],
            sizes: "(max-width: 274px) 100vw, 274px",
            style: {
              width: "100%",
              height: "100%",
              margin: "0",
              verticalAlign: "middle",
              position: "absolute",
              top: "0",
              left: "0",
            },
            loading: "lazy",
          }),
          "\n    "
        )
      ),
      mdx(
        "p",
        null,
        "When we finish performing work on a fiber, if it has a ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "child"
        ),
        " that fiber will be the next unit of work."
      ),
      mdx(
        "p",
        null,
        "From our example, when we finish working on the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "div"
        ),
        " fiber the next unit of work will be the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "h1"
        ),
        " fiber."
      ),
      mdx(
        "p",
        null,
        mdx(
          "span",
          {
            parentName: "p",
            className: "gatsby-resp-image-wrapper",
            style: {
              position: "relative",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "274px",
            },
          },
          "\n      ",
          mdx("span", {
            parentName: "span",
            className: "gatsby-resp-image-background-image",
            style: {
              paddingBottom: "116.1904761904762%",
              position: "relative",
              bottom: "0",
              left: "0",
              backgroundImage:
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFJUlEQVQ4y22Ve2xTVRzHv33cjnWyUh4uRvQfMFECISK+USOJEEyMBGMiyRIREEKUsMEfopiJygYbjo22u7197QELsIHjNUM0JItDIyAMGLQ9t8+tjJEijD07oazH37kb0zhu8s05PTn3c7+/xzkF/vfEIuyhTLGoOonGbNJj2lo0BF5pALeR7EZwx7/KiLHKCDwCqBsDziEtJy0jvTi6FtRxZw64J9fAvRaJ1z+h4zXTjBmfxUS/szjnE4Ed8TA6STQaEx2RnK5ELDsRD0vXb3Sj++ov4O8DfAfMmRLM4KWYlKnES5kKvE1anGlZNBFonT4TH63Mx5y5C7B23QZjWdluyxdbvzKUlJSirLwYfeRikB+Uhrg3J9WzQ0r5V1tTwU8fH2br8lK9O6dMAPp8Png8HjHq3W53jsvlmuz1eo1OxYPGejvZ4+C9K7J4/0oLH/o4iw8WvMqHNr7GUxsX8oHP5iEWC4znLRFm8JZWQi7bA++h/RIBZ/h83hzfkQNG5evvUPJ9Nd48x7HiEs8mWT9p56Yt/vSs1e187qp2/syHl3ke4rHgeGWvhxiKulshh1rxM7+tOf67vwfN9+Nw916Gu88vDGJbcND4ZSBl3ux/IG3y87mbAw8WkuZv9o+8jI5It4C9TjJ3kkPwNthGgvpjA+qTHbHQW/EIe+5YP5tZxVW9nd9BTcsJFLanUeDP4HM/1yTmBNZEDjV3+fSitYOAvIlhEVfR3Mtm0/o7BH2+uU+dtS3dpq84fQT24jLsbvgJ6xMEujZCMK4jkK5AU4b6LspE874rHNIclxIMjuGrOJmKoKszCtFbrSTnqcNwul2SLMtGp9MJTbKMnUdaUHApI8CaCKhOJdD8aITpRR6vnP0DyrelqD7aYKirrTVTxae5anxm2e4QgGzZKc8YB/5H449wQKBX4uQ0Lhy2nQe1ChRFMZBE22STKxPp4csGmlto1Il9x442iSjHCyuOk5isIk0XC1evtKGiogKOfT5jVVWVtWTXLslVXysJmICOgUXoZpvNBvvNc+gLhiAKWnNf1c6umfQBKffhV6JqAHYqTMuab5CMRY2NfQGcONQI2WYXedSc0se0CF3pIPYNBJEIMVPdPaYVZSpBlogcdqkMd68xJIMMp+6yBZEoWxqKsoUHUmx2J6WmqrxST7Bc0hTF6bSe//0MTvayebRveTjG3mgaYM8iHlUNJBGuvjOs0skJgSVCoFaxRuOhvOvJRO7BdHjycU/daMiOKsiUP8WlGM4ELoAglkiMPR2OqTN/pLkAjidV5EEUSeg079HG7UXbs1+g0MYKIgqUI+bV1T6E07cEEOQOalxF49BoyGNAlU6NitraGni8dDk01BtoFFW2KrU+idpFAI3kbqroReHWVrkXx4cjAqgLEfDwIJt4fTldCuRRGSgsi8vtypHdikH2eaE47Dix4T0KWbE43F5JpraxNTfgbDfD2ZsMO/kjgPaS3XDuKodSukdfUfrD5C356w2uwiJdTf4atM8GilqC2hVWV7zNVL9uLUr4X/gtqeJMkqH8UcAmnoSLbpoK3qO7wu9If96NZ9l4Qlc2fBtbIlxXeC0tbQxxaUOCm4rSnPaFda1JNevXW8xk40w3AdhAiVVGGDwP2LSLXWzZhRtscfU9lufo78DW0D1pU4DnFQQyTxUGRmYV93WjkqtTaM9S0pK9nFknAgeDWnFuqiroBpreQf96yaCK89E4NgXpimJ0CYgxwHGRdeJ2QBSTZdNes3jnHygtoH7XUl13AAAAAElFTkSuQmCC')",
              backgroundSize: "cover",
              display: "block",
            },
          }),
          "\n  ",
          mdx("img", {
            parentName: "span",
            className: "gatsby-resp-image-image",
            alt: "Fiber Tree 3",
            title: "Fiber Tree 3",
            src: "/static/c8bdcc17706e9ab06233c980ed9cf007/d3fa7/fiber3.png",
            srcSet: [
              "/static/c8bdcc17706e9ab06233c980ed9cf007/79c17/fiber3.png 105w",
              "/static/c8bdcc17706e9ab06233c980ed9cf007/65ed1/fiber3.png 210w",
              "/static/c8bdcc17706e9ab06233c980ed9cf007/d3fa7/fiber3.png 274w",
            ],
            sizes: "(max-width: 274px) 100vw, 274px",
            style: {
              width: "100%",
              height: "100%",
              margin: "0",
              verticalAlign: "middle",
              position: "absolute",
              top: "0",
              left: "0",
            },
            loading: "lazy",
          }),
          "\n    "
        )
      ),
      mdx(
        "p",
        null,
        "If the fiber doesn\u2019t have a ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "child"
        ),
        ", we use the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "sibling"
        ),
        " as the next unit of work."
      ),
      mdx(
        "p",
        null,
        "For example, the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "p"
        ),
        " fiber doesn\u2019t have a ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "child"
        ),
        " so we move to the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "a"
        ),
        " fiber after finishing it."
      ),
      mdx(
        "p",
        null,
        mdx(
          "span",
          {
            parentName: "p",
            className: "gatsby-resp-image-wrapper",
            style: {
              position: "relative",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "274px",
            },
          },
          "\n      ",
          mdx("span", {
            parentName: "span",
            className: "gatsby-resp-image-background-image",
            style: {
              paddingBottom: "116.1904761904762%",
              position: "relative",
              bottom: "0",
              left: "0",
              backgroundImage:
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFSElEQVQ4y22Ve0zTVxTHv33xKGotysii2ZaoyWY0Zoa9nNsyEzXun5ktS2ZiMuecxmwq6OZUmLKpKPhALf31LaiIQxGNupgZEzZmouyBIJbeX+mLgmgXoUCxToGenV9VtgybfHJvb+7v0/M759xb4H+fgE88ISXgl9N4TGfGJNf8XtABDegQY9KCyv4loYxmLfAUoeqxcDqzmFnEvPJozaMiSwbIMU5DToOOKp9VUfkEbcJlSOHvqUQ0WhgKtqGd4VEbDvkyOsOB9HCwTddxqwtdLZdA7wO0A/pEEbKoGGmJA3g1UYp3mXmJurmjhcaJk/HxkqWYPmM2VqxcrS0p2WP4ZtMWTVFRMUr27UQfRzFAJ3T3yJkR79mhi7uXG+Oez5+5L1Zmx3t3jR8ldLlccDgcyqi22+0ZNpttrNPp1FqsDpysNHF4BOr9IJX6lxjo3iepNJD7Bt1bM4fia3Io9sVMBAKtI3kLtwk4iw9AKtkP5w/HdCzMcrmcGa6aKq214HsUbT+MtxsIH1yndMb46Q1K2eAenLL8Bs1YdoOmfdRE2QgGPCOV7fAKbO2qh+Stx090Nxnx3/09uPAwCHtvE+x9biVA5HsGtJtb4/r17iHdOjfNWN86lMPMWu8efg0hX5cie5PRt3OEoEYcGvaoz8bkSaGA952gT7x0tl9MNpOsNlE3yuvOIe/GIHLdCXzppiTKnMVJOMJkdEv5QWOIhVQrMJdkXOgVU3l9PktfvtAnT8kfbFSXXq6BaWcJ9lT/iFVhFt0cZhmpWKTKTZLgvvMLpXnfUyLkOa6HBcrut+B83IfOdj+U3qpnLBdPwWK36SRJ0losFiSRJOyqqUPu9YQiTsJCOZNFs/w+oVby2HztKqzfFePwmWrNkYoKPVd8gq3cpZdMZYogXbJIWSPC/zDyUSJg0etBjjSoRNj4G7hVYLVaNYzSNukcVQrz5GGNZLEYGJWy7+yZWuUtRwqrHCdlsoyZqCy0NDeitLQUZUddWrPZbCzavVtnq6zQWaxWmBzlKN+9DWWOwzqz3ak/yFGb7jSg3+OFUtDyh3Ly7OqZD5lxT37FL7fCxIWp+2wbIgG/trqvFY6fb+LrhrtY3kPYWiew1sP5mr8CtkEPjsY8CHtFypEHIlmUTJYsUHLYKQtEbwpEPAIXo2K2zy8Wev0ipyouphIZuf9iKV95BietcydeyGtNTKnxRHC+T57J+xa3BcRbtTHxIoJ+WcMor6tub5P55Hghwl5wqxj9QW92RyQ8rmrQN4YC34L6V4OG5kDyt2nWuim1NtQFlhh8AfFcW0CefJrninAkqUoelCIpXKae5Fi4tTD9HBcv2l4IiuZnUu/mrGh3MZBLmHyFcDomg6ODHJRx8t6jV34slPnUyKioKIfDyZdDdaWGR6XKxooqu87btBNDPQVpiWj+tOFoQRr15/ElsRFVsQ5FqPKy8NSAGH19WWxWSI/QWG1Wg81uyyiz2DTcYKCBLaDBTUhEC54f7inQsxh3YyVouC1wjdlFTxGaivbAsnsfrMX71aXFe8duWLpKY9+wTXXJvAn0YCNC7u2cilwVyw0Uy8McTsuVOzJ+jQjse5qwliKw8U1TSj2qZurW/R4NppZRSGWNNmOv4ziOHzOpCwpdamiuqnI4h/sSXlV9RE795S+RcoiEapSwmhNrHRZwDIkJf3aKRX/cEvMOPxDZru4mOGpPaCTJkmG1SOPsLlumKdKAAyTG856FzIKDJIyjhQOeZHFuyzL4BpoY4n+9iEeGW7RAMpuTx085hlKZGf6mJnS7BZQ9vFevPPMPA6KsLDhGGjgAAAAASUVORK5CYII=')",
              backgroundSize: "cover",
              display: "block",
            },
          }),
          "\n  ",
          mdx("img", {
            parentName: "span",
            className: "gatsby-resp-image-image",
            alt: "Fiber Tree 4",
            title: "Fiber Tree 4",
            src: "/static/19c304dcb3824b14722691ded539ecdb/d3fa7/fiber4.png",
            srcSet: [
              "/static/19c304dcb3824b14722691ded539ecdb/79c17/fiber4.png 105w",
              "/static/19c304dcb3824b14722691ded539ecdb/65ed1/fiber4.png 210w",
              "/static/19c304dcb3824b14722691ded539ecdb/d3fa7/fiber4.png 274w",
            ],
            sizes: "(max-width: 274px) 100vw, 274px",
            style: {
              width: "100%",
              height: "100%",
              margin: "0",
              verticalAlign: "middle",
              position: "absolute",
              top: "0",
              left: "0",
            },
            loading: "lazy",
          }),
          "\n    "
        )
      ),
      mdx(
        "p",
        null,
        "And if the fiber doesn\u2019t have a ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "child"
        ),
        " nor a ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "sibling"
        ),
        " we go to the \u201Cuncle\u201D: the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "sibling"
        ),
        " of the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "parent"
        ),
        ". Like ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "a"
        ),
        " and ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "h2"
        ),
        " fibers from the example."
      ),
      mdx(
        "p",
        null,
        "Also, if the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "parent"
        ),
        " doesn\u2019t have a ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "sibling"
        ),
        ", we keep going up through the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "parent"
        ),
        "s until we find one with a ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "sibling"
        ),
        " or until we reach the root. If we have reached the root, it means we have finished performing all the work for this ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "render"
        ),
        "."
      )
    ),
    mdx("p", null, "Now let\u2019s put it into code."),
    mdx(
      CodeWave,
      {
        mdxType: "CodeWave",
      },
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./11.jsx 25:45",
            file: "./11.jsx",
            "25:45": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction render(element, container) {\n  const dom =\n    element.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(element.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(element.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = element.props[name]\n    })\n\n  element.props.children.forEach(child =>\n    render(child, dom)\n  )\n\n  container.appendChild(dom)\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(nextUnitOfWork) {\n  // TODO\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "First, let\u2019s remove this code from the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "render"
        ),
        " function."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./12.jsx 25,39,41:45",
            file: "./12.jsx",
            "25,39,41:45": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction render(element, container) {\n  // TODO set next unit of work\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  // TODO add dom node\n  // TODO create new fibers\n  // TODO return next unit of work\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "We keep the part that creates a DOM node in its own function, we are going to use it later."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./13.jsx 41:50",
            file: "./13.jsx",
            "41:50": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction render(element, container) {\n  nextUnitOfWork = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n  }\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  // TODO add dom node\n  // TODO create new fibers\n  // TODO return next unit of work\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "In the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "render"
        ),
        " function we set ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "nextUnitOfWork"
        ),
        " to the root of the fiber tree."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./13.jsx 52,55:57,61,65:69",
            file: "./13.jsx",
            "52,55:57,61,65:69": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction render(element, container) {\n  nextUnitOfWork = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n  }\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  // TODO add dom node\n  // TODO create new fibers\n  // TODO return next unit of work\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "Then, when the browser is ready,it will call our ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "workLoop"
        ),
        " and we\u2019ll start working on the root."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./14.jsx",
            file: "./14.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction render(element, container) {\n  nextUnitOfWork = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n  }\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  if (fiber.parent) {\n    fiber.parent.dom.appendChild(fiber.dom)\n  }\n\n  // TODO create new fibers\n  // TODO return next unit of work\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx("p", null, "First, we create a new node and append it to the DOM."),
      mdx(
        "p",
        null,
        "We keep track of the DOM node in the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "fiber.dom"
        ),
        " property. "
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./15.jsx",
            file: "./15.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction render(element, container) {\n  nextUnitOfWork = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n  }\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  if (fiber.parent) {\n    fiber.parent.dom.appendChild(fiber.dom)\n  }\n\n  const elements = fiber.props.children\n  let index = 0\n  let prevSibling = null\n\n  while (index < elements.length) {\n    const element = elements[index]\n\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: fiber,\n      dom: null,\n    }\n  }\n\n  // TODO return next unit of work\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx("p", null, "Then for each child we create a new fiber."),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./16.jsx",
            file: "./16.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction render(element, container) {\n  nextUnitOfWork = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n  }\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  if (fiber.parent) {\n    fiber.parent.dom.appendChild(fiber.dom)\n  }\n\n  const elements = fiber.props.children\n  let index = 0\n  let prevSibling = null\n\n  while (index < elements.length) {\n    const element = elements[index]\n\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: fiber,\n      dom: null,\n    }\n\n    if (index === 0) {\n      fiber.child = newFiber\n    } else {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n\n  // TODO return next unit of work\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "And we add it to the fiber tree setting it either as a child or as a sibling, depending on whether it\u2019s the first child or not."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./17.jsx",
            file: "./17.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction render(element, container) {\n  nextUnitOfWork = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n  }\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  if (fiber.parent) {\n    fiber.parent.dom.appendChild(fiber.dom)\n  }\n\n  const elements = fiber.props.children\n  let index = 0\n  let prevSibling = null\n\n  while (index < elements.length) {\n    const element = elements[index]\n\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: fiber,\n      dom: null,\n    }\n\n    if (index === 0) {\n      fiber.child = newFiber\n    } else {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "Finally we search for the next unit of work.\nWe first try with the child, then with the sibling, then with the uncle, and so on."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./17.jsx 65:108",
            file: "./17.jsx",
            "65:108": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction render(element, container) {\n  nextUnitOfWork = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n  }\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  if (fiber.parent) {\n    fiber.parent.dom.appendChild(fiber.dom)\n  }\n\n  const elements = fiber.props.children\n  let index = 0\n  let prevSibling = null\n\n  while (index < elements.length) {\n    const element = elements[index]\n\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: fiber,\n      dom: null,\n    }\n\n    if (index === 0) {\n      fiber.child = newFiber\n    } else {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "And that\u2019s our ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "performUnitOfWork"
        ),
        "."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./17.jsx 65,70:72",
            file: "./17.jsx",
            "65,70:72": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction render(element, container) {\n  nextUnitOfWork = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n  }\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  if (fiber.parent) {\n    fiber.parent.dom.appendChild(fiber.dom)\n  }\n\n  const elements = fiber.props.children\n  let index = 0\n  let prevSibling = null\n\n  while (index < elements.length) {\n    const element = elements[index]\n\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: fiber,\n      dom: null,\n    }\n\n    if (index === 0) {\n      fiber.child = newFiber\n    } else {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "h3",
        {
          id: "step-v-render-and-commit-phases",
        },
        "Step V: Render and Commit Phases"
      ),
      mdx("p", null, "We have another problem here."),
      mdx(
        "p",
        null,
        "We are adding a new node to the DOM each time we work on an element.\nAnd, remember, the browser could interrupt our work before we finish rendering the whole tree.\nIn that case, the user will see an incomplete UI. And we don\u2019t want that."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./18.jsx 65,72[1]",
            file: "./18.jsx",
            "65,72[1]": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction render(element, container) {\n  nextUnitOfWork = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n  }\n}\n\nlet nextUnitOfWork = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  let index = 0\n  let prevSibling = null\n\n  while (index < elements.length) {\n    const element = elements[index]\n\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: fiber,\n      dom: null,\n    }\n\n    if (index === 0) {\n      fiber.child = newFiber\n    } else {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "So we need to remove the part that mutates the DOM from here."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./18.1.jsx",
            file: "./18.1.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n  }\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet wipRoot = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  let index = 0\n  let prevSibling = null\n\n  while (index < elements.length) {\n    const element = elements[index]\n\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: fiber,\n      dom: null,\n    }\n\n    if (index === 0) {\n      fiber.child = newFiber\n    } else {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "Instead, we\u2019ll keep track of the root of the fiber tree. We call it the work in progress root or ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "wipRoot"
        ),
        "."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./19.jsx 41:43,58,67:69,72",
            file: "./19.jsx",
            "41:43,58,67:69,72": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  // TODO add nodes to dom\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n  }\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet wipRoot = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  let index = 0\n  let prevSibling = null\n\n  while (index < elements.length) {\n    const element = elements[index]\n\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: fiber,\n      dom: null,\n    }\n\n    if (index === 0) {\n      fiber.child = newFiber\n    } else {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "And once we finish all the work (we know it because there isn\u2019t a next unit of work) we commit the whole fiber tree to the DOM."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./20.jsx 41:54",
            file: "./20.jsx",
            "41:54": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  commitWork(wipRoot.child)\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  domParent.appendChild(fiber.dom)\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n  }\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet wipRoot = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  let index = 0\n  let prevSibling = null\n\n  while (index < elements.length) {\n    const element = elements[index]\n\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: fiber,\n      dom: null,\n    }\n\n    if (index === 0) {\n      fiber.child = newFiber\n    } else {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "We do it in the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "commitRoot"
        ),
        " function. Here we recursively append all the nodes to the dom."
      ),
      mdx(
        "h3",
        {
          id: "step-vi-reconciliation",
        },
        "Step VI: Reconciliation"
      ),
      mdx(
        "p",
        null,
        "So far we only ",
        mdx(
          "em",
          {
            parentName: "p",
          },
          "added"
        ),
        " stuff to the DOM, but what about updating or deleting nodes?"
      ),
      mdx(
        "p",
        null,
        "That\u2019s what we are going to do now, we need to compare the elements we receive on the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "render"
        ),
        " function to the last fiber tree we committed to the DOM."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./21.jsx 41,43,45,57,58,63,64,66,69",
            file: "./21.jsx",
            "41,43,45,57,58,63,64,66,69": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  domParent.appendChild(fiber.dom)\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  let index = 0\n  let prevSibling = null\n\n  while (index < elements.length) {\n    const element = elements[index]\n\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: fiber,\n      dom: null,\n    }\n\n    if (index === 0) {\n      fiber.child = newFiber\n    } else {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "So we need to save a reference to that \u201Clast fiber tree we committed to the DOM\u201D after we finish the commit. We call it ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "currentRoot"
        ),
        "."
      ),
      mdx(
        "p",
        null,
        "We also add the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "alternate"
        ),
        " property to every fiber. This property is a link to the old fiber, the fiber that we committed to the DOM in the previous commit phase."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./21.jsx 90:129",
            file: "./21.jsx",
            "90:129": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  domParent.appendChild(fiber.dom)\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  let index = 0\n  let prevSibling = null\n\n  while (index < elements.length) {\n    const element = elements[index]\n\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: fiber,\n      dom: null,\n    }\n\n    if (index === 0) {\n      fiber.child = newFiber\n    } else {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "Now let\u2019s extract the code from ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "performUnitOfWork"
        ),
        " that creates the new fibers\u2026"
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./22.jsx 90,95,96,108,110,114[1]",
            file: "./22.jsx",
            "90,95,96,108,110,114[1]": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  domParent.appendChild(fiber.dom)\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let prevSibling = null\n\n  while (index < elements.length) {\n    const element = elements[index]\n\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: wipFiber,\n      dom: null,\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "\u2026to a new ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "reconcileChildren"
        ),
        " function."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./22.jsx 110,133",
            file: "./22.jsx",
            "110,133": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  domParent.appendChild(fiber.dom)\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let prevSibling = null\n\n  while (index < elements.length) {\n    const element = elements[index]\n\n    const newFiber = {\n      type: element.type,\n      props: element.props,\n      parent: wipFiber,\n      dom: null,\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "Here we will reconcile the old fibers with the new elements."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./23.jsx 110:113,116:120,123",
            file: "./23.jsx",
            "110:113,116:120,123": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  domParent.appendChild(fiber.dom)\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    // TODO compare oldFiber to element\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "We iterate at the same time over the children of the old fiber (",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "wipFiber.alternate"
        ),
        ") and the array of elements we want to reconcile."
      ),
      mdx(
        "p",
        null,
        "If we ignore all the boilerplate needed to iterate over an array and a linked list at the same time, we are left with what matters most inside this while: ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "oldFiber"
        ),
        " and ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "element"
        ),
        ". ",
        mdx(
          "strong",
          {
            parentName: "p",
          },
          "The ",
          mdx(
            "inlineCode",
            {
              parentName: "strong",
            },
            "element"
          ),
          " is the thing we want to render to the DOM and the ",
          mdx(
            "inlineCode",
            {
              parentName: "strong",
            },
            "oldFiber"
          ),
          " is what we rendered the last time."
        )
      ),
      mdx(
        "p",
        null,
        "We need to compare them to see if there\u2019s any change we need to apply to the DOM."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./24.jsx",
            file: "./24.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  domParent.appendChild(fiber.dom)\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      // TODO update the node\n    }\n    if (element && !sameType) {\n      // TODO add this node\n    }\n    if (oldFiber && !sameType) {\n      // TODO delete the oldFiber\'s node\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx("p", null, "To compare them we use the type:"),
      mdx(
        "ul",
        null,
        mdx(
          "li",
          {
            parentName: "ul",
          },
          mdx(
            "p",
            {
              parentName: "li",
            },
            "if the old fiber and the new element have the same type, we can keep the DOM node and just update it with the new props"
          )
        ),
        mdx(
          "li",
          {
            parentName: "ul",
          },
          mdx(
            "p",
            {
              parentName: "li",
            },
            "if the type is different and there is a new element, it means we need to create a new DOM node"
          )
        ),
        mdx(
          "li",
          {
            parentName: "ul",
          },
          mdx(
            "p",
            {
              parentName: "li",
            },
            "and if the types are different and there is an old fiber, we need to remove the old node"
          )
        )
      ),
      mdx(
        "p",
        null,
        mdx(
          "em",
          {
            parentName: "p",
          },
          "Here React also uses keys, that makes a better reconciliation. For example, it detects when children change places in the element array."
        )
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./25.jsx 123:137",
            file: "./25.jsx",
            "123:137": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  domParent.appendChild(fiber.dom)\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      // TODO add this node\n    }\n    if (oldFiber && !sameType) {\n      // TODO delete the oldFiber\'s node\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "When the old fiber and the element have the same type, we create a new fiber keeping the DOM node from the old fiber and the props from the element."
      ),
      mdx(
        "p",
        null,
        "We also add a new property to the fiber: the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "effectTag"
        ),
        ". We\u2019ll use this property later, during the commit phase."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./26.jsx 138:147",
            file: "./26.jsx",
            "138:147": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  domParent.appendChild(fiber.dom)\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      // TODO delete the oldFiber\'s node\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "Then for the case where the element needs a new DOM node we tag the new fiber with the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "PLACEMENT"
        ),
        " effect tag."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./27.jsx 148:151",
            file: "./27.jsx",
            "148:151": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  domParent.appendChild(fiber.dom)\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "And for the case where we need to delete the node, we don\u2019t have a new fiber so we add the effect tag to the old fiber."
      ),
      mdx(
        "p",
        null,
        "But when we commit the fiber tree to the DOM we do it from the work in progress root, which doesn\u2019t have the old fibers."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./28.jsx 57,65,67,72",
            file: "./28.jsx",
            "57,65,67,72": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  domParent.appendChild(fiber.dom)\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "So we need an array to keep track of the nodes we want to remove."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./29.jsx 41,42,46",
            file: "./29.jsx",
            "41,42,46": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  domParent.appendChild(fiber.dom)\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "And then, when we are commiting the changes to the DOM, we also use the fibers from that array."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./29.jsx 48:56",
            file: "./29.jsx",
            "48:56": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  domParent.appendChild(fiber.dom)\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "Now, let\u2019s change the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "commitWork"
        ),
        " function to handle the new ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "effectTags"
        ),
        "."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./30.jsx",
            file: "./30.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "If the fiber has a ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "PLACEMENT"
        ),
        " effect tag we do the same as before, append the DOM node to the node from the parent fiber."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./31.jsx",
            file: "./31.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (fiber.effectTag === "DELETION") {\n    domParent.removeChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "If it\u2019s a ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "DELETION"
        ),
        ", we do the opposite, remove the child."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./32.jsx",
            file: "./32.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    domParent.removeChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "And if it\u2019s an ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "UPDATE"
        ),
        ", we need to update the existing DOM node with the props that changed."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./33.jsx",
            file: "./33.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  const isProperty = key => key !== "children"\n  Object.keys(fiber.props)\n    .filter(isProperty)\n    .forEach(name => {\n      dom[name] = fiber.props[name]\n    })\n\n  return dom\n}\n\nfunction updateDom(dom, prevProps, nextProps) {\n  // TODO\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n  const domParent = fiber.parent.dom\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    domParent.removeChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "We\u2019ll do it in this ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "updateDom"
        ),
        " function."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./34.jsx 36:56",
            file: "./34.jsx",
            "36:56": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isProperty = key => key !== "children"\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  const domParent = fiber.parent.dom\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    domParent.removeChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "We compare the props from the old fiber to the props of the new fiber, remove the props that are gone, and set the props that are new or changed."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./35.jsx",
            file: "./35.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  const domParent = fiber.parent.dom\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    domParent.removeChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "One special kind of prop that we need to update are event listeners, so if the prop name starts with the \u201Con\u201D prefix we\u2019ll handle them differently."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./36.jsx",
            file: "./36.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  const domParent = fiber.parent.dom\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    domParent.removeChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "If the event handler changed we remove it from the node."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./37.jsx",
            file: "./37.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  const domParent = fiber.parent.dom\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    domParent.removeChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nconst element = (\n  <div id="foo">\n    <a>bar</a>\n    <b />\n  </div>\n)\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx("p", null, "And then we add the new handler.")
    ),
    mdx(
      "p",
      null,
      "Try the version with reconciliation on ",
      mdx(
        "a",
        {
          parentName: "p",
          href: "https://codesandbox.io/s/didact-6-96533",
        },
        "codesandbox"
      ),
      "."
    ),
    mdx(
      CodeWave,
      {
        mdxType: "CodeWave",
      },
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./38.jsx 245:251",
            file: "./38.jsx",
            "245:251": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  const domParent = fiber.parent.dom\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    domParent.removeChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nfunction App(props) {\n  return <h1>Hi {props.name}</h1>\n}\nconst element = <App name="foo" />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "h3",
        {
          id: "step-vii-function-components",
        },
        "Step VII: Function Components"
      ),
      mdx(
        "p",
        null,
        "The next thing we need to add is support for function components."
      ),
      mdx(
        "p",
        null,
        "First let\u2019s change the example. We\u2019ll use this simple function component, that returns an ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "h1"
        ),
        " element."
      ),
      mdx("p", null, "Note that if we transform the jsx to js, it will be:"),
      mdx(
        "div",
        null,
        mdx(
          "pre",
          null,
          mdx(
            "code",
            {
              parentName: "pre",
              className: "language-js",
            },
            'function App(props) {\n  return Didact.createElement(\n    "h1",\n    null,\n    "Hi ",\n    props.name\n  )\n}\nconst element = Didact.createElement(App, {\n  name: "foo",\n})\n'
          )
        )
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./38.jsx 162:168",
            file: "./38.jsx",
            "162:168": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  const domParent = fiber.parent.dom\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    domParent.removeChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n\n  const elements = fiber.props.children\n  reconcileChildren(fiber, elements)\n\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nfunction App(props) {\n  return <h1>Hi {props.name}</h1>\n}\nconst element = <App name="foo" />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx("p", null, "Function components are differents in two ways:"),
      mdx(
        "ul",
        null,
        mdx(
          "li",
          {
            parentName: "ul",
          },
          "the fiber from a function component doesn\u2019t have a DOM node"
        ),
        mdx(
          "li",
          {
            parentName: "ul",
          },
          "and the children come from running the function instead of getting them directly from the ",
          mdx(
            "inlineCode",
            {
              parentName: "li",
            },
            "props"
          )
        )
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./41.jsx",
            file: "./41.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  const domParent = fiber.parent.dom\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    domParent.removeChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionComponent =\n    fiber.type instanceof Function\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber)\n  } else {\n    updateHostComponent(fiber)\n  }\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction updateFunctionComponent(fiber) {\n  // TODO\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n  reconcileChildren(fiber, fiber.props.children)\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nfunction App(props) {\n  return <h1>Hi {props.name}</h1>\n}\nconst element = <App name="foo" />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "We check if the fiber type is a function, and depending on that we go to a different update function."
      ),
      mdx(
        "p",
        null,
        "In ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "updateHostComponent"
        ),
        " we do the same as before."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./42.jsx",
            file: "./42.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  const domParent = fiber.parent.dom\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    domParent.removeChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionComponent =\n    fiber.type instanceof Function\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber)\n  } else {\n    updateHostComponent(fiber)\n  }\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction updateFunctionComponent(fiber) {\n  const children = [fiber.type(fiber.props)]\n  reconcileChildren(fiber, children)\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n  reconcileChildren(fiber, fiber.props.children)\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nfunction App(props) {\n  return <h1>Hi {props.name}</h1>\n}\nconst element = <App name="foo" />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "And in ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "updateFunctionComponent"
        ),
        " we run the function to get the children."
      ),
      mdx(
        "p",
        null,
        "For our example, here the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "fiber.type"
        ),
        " is the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "App"
        ),
        " function and when we run it, it returns the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "h1"
        ),
        " element."
      ),
      mdx(
        "p",
        null,
        "Then, once we have the children, the reconciliation works in the same way, we don\u2019t need to change anything there."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./42.jsx 99:125",
            file: "./42.jsx",
            "99:125": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  const domParent = fiber.parent.dom\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    domParent.removeChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionComponent =\n    fiber.type instanceof Function\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber)\n  } else {\n    updateHostComponent(fiber)\n  }\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction updateFunctionComponent(fiber) {\n  const children = [fiber.type(fiber.props)]\n  reconcileChildren(fiber, children)\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n  reconcileChildren(fiber, fiber.props.children)\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nfunction App(props) {\n  return <h1>Hi {props.name}</h1>\n}\nconst element = <App name="foo" />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "What we need to change is the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "commitWork"
        ),
        " function."
      ),
      mdx(
        "p",
        null,
        "Now that we have fibers without DOM nodes we need to change two things."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./43.jsx 104:108,114",
            file: "./43.jsx",
            "104:108,114": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  let domParentFiber = fiber.parent\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent\n  }\n  const domParent = domParentFiber.dom\n\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    domParent.removeChild(fiber.dom)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionComponent =\n    fiber.type instanceof Function\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber)\n  } else {\n    updateHostComponent(fiber)\n  }\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction updateFunctionComponent(fiber) {\n  const children = [fiber.type(fiber.props)]\n  reconcileChildren(fiber, children)\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n  reconcileChildren(fiber, fiber.props.children)\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nfunction App(props) {\n  return <h1>Hi {props.name}</h1>\n}\nconst element = <App name="foo" />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "First, to find the parent of a DOM node we\u2019ll need to go up the fiber tree until we find a fiber with a DOM node."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./44.jsx",
            file: "./44.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  let domParentFiber = fiber.parent\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent\n  }\n  const domParent = domParentFiber.dom\n\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    commitDeletion(fiber, domParent)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom)\n  } else {\n    commitDeletion(fiber.child, domParent)\n  }\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionComponent =\n    fiber.type instanceof Function\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber)\n  } else {\n    updateHostComponent(fiber)\n  }\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction updateFunctionComponent(fiber) {\n  const children = [fiber.type(fiber.props)]\n  reconcileChildren(fiber, children)\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n  reconcileChildren(fiber, fiber.props.children)\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nfunction App(props) {\n  return <h1>Hi {props.name}</h1>\n}\nconst element = <App name="foo" />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "And when removing a node we also need to keep going until we find a child with a DOM node."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./44.jsx 270:276",
            file: "./44.jsx",
            "270:276": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  let domParentFiber = fiber.parent\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent\n  }\n  const domParent = domParentFiber.dom\n\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    commitDeletion(fiber, domParent)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom)\n  } else {\n    commitDeletion(fiber.child, domParent)\n  }\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionComponent =\n    fiber.type instanceof Function\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber)\n  } else {\n    updateHostComponent(fiber)\n  }\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction updateFunctionComponent(fiber) {\n  const children = [fiber.type(fiber.props)]\n  reconcileChildren(fiber, children)\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n  reconcileChildren(fiber, fiber.props.children)\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n}\n\n/** @jsx Didact.createElement */\nfunction App(props) {\n  return <h1>Hi {props.name}</h1>\n}\nconst element = <App name="foo" />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "h3",
        {
          id: "step-viii-hooks",
        },
        "Step VIII: Hooks"
      ),
      mdx(
        "p",
        null,
        "Last step. Now that we have function components let\u2019s also add state."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./45.jsx",
            file: "./45.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  let domParentFiber = fiber.parent\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent\n  }\n  const domParent = domParentFiber.dom\n\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    commitDeletion(fiber, domParent)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom)\n  } else {\n    commitDeletion(fiber.child, domParent)\n  }\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionComponent =\n    fiber.type instanceof Function\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber)\n  } else {\n    updateHostComponent(fiber)\n  }\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction updateFunctionComponent(fiber) {\n  const children = [fiber.type(fiber.props)]\n  reconcileChildren(fiber, children)\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n  reconcileChildren(fiber, fiber.props.children)\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n  useState,\n}\n\n/** @jsx Didact.createElement */\nfunction Counter() {\n  const [state, setState] = Didact.useState(1)\n  return (\n    <h1 onClick={() => setState(c => c + 1)}>\n      Count: {state}\n    </h1>\n  )\n}\nconst element = <Counter />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "Let\u2019s change our example to the classic counter component. Each time we click it, it increments the state by one."
      ),
      mdx(
        "p",
        null,
        "Note that we are using ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "Didact.useState"
        ),
        " to get and update the counter value."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./46.jsx 195,196,198:202",
            file: "./46.jsx",
            "195,196,198:202": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  let domParentFiber = fiber.parent\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent\n  }\n  const domParent = domParentFiber.dom\n\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    commitDeletion(fiber, domParent)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom)\n  } else {\n    commitDeletion(fiber.child, domParent)\n  }\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionComponent =\n    fiber.type instanceof Function\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber)\n  } else {\n    updateHostComponent(fiber)\n  }\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nfunction updateFunctionComponent(fiber) {\n  const children = [fiber.type(fiber.props)]\n  reconcileChildren(fiber, children)\n}\n\nfunction useState(initial) {\n  // TODO\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n  reconcileChildren(fiber, fiber.props.children)\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n  useState,\n}\n\n/** @jsx Didact.createElement */\nfunction Counter() {\n  const [state, setState] = Didact.useState(1)\n  return (\n    <h1 onClick={() => setState(c => c + 1)}>\n      Count: {state}\n    </h1>\n  )\n}\nconst element = <Counter />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "Here is where we call the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "Counter"
        ),
        " function from the example. And inside that function we call ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "useState"
        ),
        "."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./47.jsx 195:201,202[21:43],204",
            file: "./47.jsx",
            "195:201,202[21:43],204": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  let domParentFiber = fiber.parent\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent\n  }\n  const domParent = domParentFiber.dom\n\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    commitDeletion(fiber, domParent)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom)\n  } else {\n    commitDeletion(fiber.child, domParent)\n  }\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionComponent =\n    fiber.type instanceof Function\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber)\n  } else {\n    updateHostComponent(fiber)\n  }\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nlet wipFiber = null\nlet hookIndex = null\n\nfunction updateFunctionComponent(fiber) {\n  wipFiber = fiber\n  hookIndex = 0\n  wipFiber.hooks = []\n  const children = [fiber.type(fiber.props)]\n  reconcileChildren(fiber, children)\n}\n\nfunction useState(initial) {\n  // TODO\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n  reconcileChildren(fiber, fiber.props.children)\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n  useState,\n}\n\n/** @jsx Didact.createElement */\nfunction Counter() {\n  const [state, setState] = Didact.useState(1)\n  return (\n    <h1 onClick={() => setState(c => c + 1)}>\n      Count: {state}\n    </h1>\n  )\n}\nconst element = <Counter />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "We need to initialize some global variables before calling the function component so we can use them inside of the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "useState"
        ),
        " function."
      ),
      mdx("p", null, "First we set the work in progress fiber."),
      mdx(
        "p",
        null,
        "We also add a ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "hooks"
        ),
        " array to the fiber to support calling ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "useState"
        ),
        " several times in the same component. And we keep track of the current hook index."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./48.jsx 206:218",
            file: "./48.jsx",
            "206:218": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  let domParentFiber = fiber.parent\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent\n  }\n  const domParent = domParentFiber.dom\n\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    commitDeletion(fiber, domParent)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom)\n  } else {\n    commitDeletion(fiber.child, domParent)\n  }\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionComponent =\n    fiber.type instanceof Function\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber)\n  } else {\n    updateHostComponent(fiber)\n  }\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nlet wipFiber = null\nlet hookIndex = null\n\nfunction updateFunctionComponent(fiber) {\n  wipFiber = fiber\n  hookIndex = 0\n  wipFiber.hooks = []\n  const children = [fiber.type(fiber.props)]\n  reconcileChildren(fiber, children)\n}\n\nfunction useState(initial) {\n  const oldHook =\n    wipFiber.alternate &&\n    wipFiber.alternate.hooks &&\n    wipFiber.alternate.hooks[hookIndex]\n  const hook = {\n    state: oldHook ? oldHook.state : initial,\n  }\n\n  wipFiber.hooks.push(hook)\n  hookIndex++\n  return [hook.state]\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n  reconcileChildren(fiber, fiber.props.children)\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n  useState,\n}\n\n/** @jsx Didact.createElement */\nfunction Counter() {\n  const [state, setState] = Didact.useState(1)\n  return (\n    <h1 onClick={() => setState(c => c + 1)}>\n      Count: {state}\n    </h1>\n  )\n}\nconst element = <Counter />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "When the function component calls ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "useState"
        ),
        ", we check if we have an old hook. We check in the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "alternate"
        ),
        " of the fiber using the hook index."
      ),
      mdx(
        "p",
        null,
        "If we have an old hook, we copy the state from the old hook to the new hook,\nif we don\u2019t we initialize the state."
      ),
      mdx(
        "p",
        null,
        "Then we add the new hook to the fiber, increment the hook index by one, and return the state."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./49.jsx 211,213:225,229",
            file: "./49.jsx",
            "211,213:225,229": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  let domParentFiber = fiber.parent\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent\n  }\n  const domParent = domParentFiber.dom\n\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    commitDeletion(fiber, domParent)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom)\n  } else {\n    commitDeletion(fiber.child, domParent)\n  }\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionComponent =\n    fiber.type instanceof Function\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber)\n  } else {\n    updateHostComponent(fiber)\n  }\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nlet wipFiber = null\nlet hookIndex = null\n\nfunction updateFunctionComponent(fiber) {\n  wipFiber = fiber\n  hookIndex = 0\n  wipFiber.hooks = []\n  const children = [fiber.type(fiber.props)]\n  reconcileChildren(fiber, children)\n}\n\nfunction useState(initial) {\n  const oldHook =\n    wipFiber.alternate &&\n    wipFiber.alternate.hooks &&\n    wipFiber.alternate.hooks[hookIndex]\n  const hook = {\n    state: oldHook ? oldHook.state : initial,\n    queue: [],\n  }\n\n  const setState = action => {\n    hook.queue.push(action)\n    wipRoot = {\n      dom: currentRoot.dom,\n      props: currentRoot.props,\n      alternate: currentRoot,\n    }\n    nextUnitOfWork = wipRoot\n    deletions = []\n  }\n\n  wipFiber.hooks.push(hook)\n  hookIndex++\n  return [hook.state, setState]\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n  reconcileChildren(fiber, fiber.props.children)\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n  useState,\n}\n\n/** @jsx Didact.createElement */\nfunction Counter() {\n  const [state, setState] = Didact.useState(1)\n  return (\n    <h1 onClick={() => setState(c => c + 1)}>\n      Count: {state}\n    </h1>\n  )\n}\nconst element = <Counter />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "useState"
        ),
        " should also return a function to update the state, so we define a ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "setState"
        ),
        " function that receives an action (for the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "Counter"
        ),
        " example this action is the function that increments the state by one)."
      ),
      mdx("p", null, "We push that action to a queue we added to the hook."),
      mdx(
        "p",
        null,
        "And then we do something similar to what we did in the ",
        mdx(
          "inlineCode",
          {
            parentName: "p",
          },
          "render"
        ),
        " function, set a new work in progress root as the next unit of work so the work loop can start a new render phase."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./50.jsx",
            file: "./50.jsx",
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  let domParentFiber = fiber.parent\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent\n  }\n  const domParent = domParentFiber.dom\n\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    commitDeletion(fiber, domParent)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom)\n  } else {\n    commitDeletion(fiber.child, domParent)\n  }\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionComponent =\n    fiber.type instanceof Function\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber)\n  } else {\n    updateHostComponent(fiber)\n  }\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nlet wipFiber = null\nlet hookIndex = null\n\nfunction updateFunctionComponent(fiber) {\n  wipFiber = fiber\n  hookIndex = 0\n  wipFiber.hooks = []\n  const children = [fiber.type(fiber.props)]\n  reconcileChildren(fiber, children)\n}\n\nfunction useState(initial) {\n  const oldHook =\n    wipFiber.alternate &&\n    wipFiber.alternate.hooks &&\n    wipFiber.alternate.hooks[hookIndex]\n  const hook = {\n    state: oldHook ? oldHook.state : initial,\n    queue: [],\n  }\n\n  const actions = oldHook ? oldHook.queue : []\n  actions.forEach(action => {\n    hook.state = action(hook.state)\n  })\n\n  const setState = action => {\n    hook.queue.push(action)\n    wipRoot = {\n      dom: currentRoot.dom,\n      props: currentRoot.props,\n      alternate: currentRoot,\n    }\n    nextUnitOfWork = wipRoot\n    deletions = []\n  }\n\n  wipFiber.hooks.push(hook)\n  hookIndex++\n  return [hook.state, setState]\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n  reconcileChildren(fiber, fiber.props.children)\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n  useState,\n}\n\n/** @jsx Didact.createElement */\nfunction Counter() {\n  const [state, setState] = Didact.useState(1)\n  return (\n    <h1 onClick={() => setState(c => c + 1)}>\n      Count: {state}\n    </h1>\n  )\n}\nconst element = <Counter />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx("p", null, "But we haven\u2019t run the action yet."),
      mdx(
        "p",
        null,
        "We do it the next time we are rendering the component, we get all the actions from the old hook queue, and then apply them one by one to the new hook state, so when we return the state it\u2019s updated."
      ),
      mdx(
        "pre",
        null,
        mdx(
          "code",
          {
            parentName: "pre",
            className: "language-jsx",
            metastring: "file=./50.jsx 1:319",
            file: "./50.jsx",
            "1:319": true,
          },
          'function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child =>\n        typeof child === "object"\n          ? child\n          : createTextElement(child)\n      ),\n    },\n  }\n}\n\nfunction createTextElement(text) {\n  return {\n    type: "TEXT_ELEMENT",\n    props: {\n      nodeValue: text,\n      children: [],\n    },\n  }\n}\n\nfunction createDom(fiber) {\n  const dom =\n    fiber.type == "TEXT_ELEMENT"\n      ? document.createTextNode("")\n      : document.createElement(fiber.type)\n\n  updateDom(dom, {}, fiber.props)\n\n  return dom\n}\n\nconst isEvent = key => key.startsWith("on")\nconst isProperty = key =>\n  key !== "children" && !isEvent(key)\nconst isNew = (prev, next) => key =>\n  prev[key] !== next[key]\nconst isGone = (prev, next) => key => !(key in next)\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps)\n    .filter(isEvent)\n    .filter(\n      key =>\n        !(key in nextProps) ||\n        isNew(prevProps, nextProps)(key)\n    )\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.removeEventListener(\n        eventType,\n        prevProps[name]\n      )\n    })\n\n  // Remove old properties\n  Object.keys(prevProps)\n    .filter(isProperty)\n    .filter(isGone(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = ""\n    })\n\n  // Set new or changed properties\n  Object.keys(nextProps)\n    .filter(isProperty)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      dom[name] = nextProps[name]\n    })\n\n  // Add event listeners\n  Object.keys(nextProps)\n    .filter(isEvent)\n    .filter(isNew(prevProps, nextProps))\n    .forEach(name => {\n      const eventType = name\n        .toLowerCase()\n        .substring(2)\n      dom.addEventListener(\n        eventType,\n        nextProps[name]\n      )\n    })\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork)\n  commitWork(wipRoot.child)\n  currentRoot = wipRoot\n  wipRoot = null\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return\n  }\n\n  let domParentFiber = fiber.parent\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent\n  }\n  const domParent = domParentFiber.dom\n\n  if (\n    fiber.effectTag === "PLACEMENT" &&\n    fiber.dom != null\n  ) {\n    domParent.appendChild(fiber.dom)\n  } else if (\n    fiber.effectTag === "UPDATE" &&\n    fiber.dom != null\n  ) {\n    updateDom(\n      fiber.dom,\n      fiber.alternate.props,\n      fiber.props\n    )\n  } else if (fiber.effectTag === "DELETION") {\n    commitDeletion(fiber, domParent)\n  }\n\n  commitWork(fiber.child)\n  commitWork(fiber.sibling)\n}\n\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom)\n  } else {\n    commitDeletion(fiber.child, domParent)\n  }\n}\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element],\n    },\n    alternate: currentRoot,\n  }\n  deletions = []\n  nextUnitOfWork = wipRoot\n}\n\nlet nextUnitOfWork = null\nlet currentRoot = null\nlet wipRoot = null\nlet deletions = null\n\nfunction workLoop(deadline) {\n  let shouldYield = false\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(\n      nextUnitOfWork\n    )\n    shouldYield = deadline.timeRemaining() < 1\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot()\n  }\n\n  requestIdleCallback(workLoop)\n}\n\nrequestIdleCallback(workLoop)\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionComponent =\n    fiber.type instanceof Function\n  if (isFunctionComponent) {\n    updateFunctionComponent(fiber)\n  } else {\n    updateHostComponent(fiber)\n  }\n  if (fiber.child) {\n    return fiber.child\n  }\n  let nextFiber = fiber\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling\n    }\n    nextFiber = nextFiber.parent\n  }\n}\n\nlet wipFiber = null\nlet hookIndex = null\n\nfunction updateFunctionComponent(fiber) {\n  wipFiber = fiber\n  hookIndex = 0\n  wipFiber.hooks = []\n  const children = [fiber.type(fiber.props)]\n  reconcileChildren(fiber, children)\n}\n\nfunction useState(initial) {\n  const oldHook =\n    wipFiber.alternate &&\n    wipFiber.alternate.hooks &&\n    wipFiber.alternate.hooks[hookIndex]\n  const hook = {\n    state: oldHook ? oldHook.state : initial,\n    queue: [],\n  }\n\n  const actions = oldHook ? oldHook.queue : []\n  actions.forEach(action => {\n    hook.state = action(hook.state)\n  })\n\n  const setState = action => {\n    hook.queue.push(action)\n    wipRoot = {\n      dom: currentRoot.dom,\n      props: currentRoot.props,\n      alternate: currentRoot,\n    }\n    nextUnitOfWork = wipRoot\n    deletions = []\n  }\n\n  wipFiber.hooks.push(hook)\n  hookIndex++\n  return [hook.state, setState]\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber)\n  }\n  reconcileChildren(fiber, fiber.props.children)\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0\n  let oldFiber =\n    wipFiber.alternate && wipFiber.alternate.child\n  let prevSibling = null\n\n  while (\n    index < elements.length ||\n    oldFiber != null\n  ) {\n    const element = elements[index]\n    let newFiber = null\n\n    const sameType =\n      oldFiber &&\n      element &&\n      element.type == oldFiber.type\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: "UPDATE",\n      }\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: "PLACEMENT",\n      }\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = "DELETION"\n      deletions.push(oldFiber)\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber\n    } else if (element) {\n      prevSibling.sibling = newFiber\n    }\n\n    prevSibling = newFiber\n    index++\n  }\n}\n\nconst Didact = {\n  createElement,\n  render,\n  useState,\n}\n\n/** @jsx Didact.createElement */\nfunction Counter() {\n  const [state, setState] = Didact.useState(1)\n  return (\n    <h1 onClick={() => setState(c => c + 1)}>\n      Count: {state}\n    </h1>\n  )\n}\nconst element = <Counter />\nconst container = document.getElementById("root")\nDidact.render(element, container)\n'
        )
      ),
      mdx(
        "p",
        null,
        "And that\u2019s all. We\u2019ve built our own version of React."
      ),
      mdx(
        "p",
        null,
        "You can play with it on ",
        mdx(
          "a",
          {
            parentName: "p",
            href: "https://codesandbox.io/s/didact-8-21ost",
          },
          "codesandbox"
        ),
        " or ",
        mdx(
          "a",
          {
            parentName: "p",
            href: "https://github.com/pomber/didact",
          },
          "github"
        ),
        "."
      )
    ),
    mdx(
      "h3",
      {
        id: "epilogue",
      },
      "Epilogue"
    ),
    mdx(
      "p",
      null,
      "Besides helping you understand how React works, one of the goals of this post is to make it easier for you to dive deeper in the React codebase. That\u2019s why we used the same variable and function names almost everywhere."
    ),
    mdx(
      "p",
      null,
      "For example, if you add a breakpoint in one of your function components in a real React app, the call stack should show you:"
    ),
    mdx(
      "ul",
      null,
      mdx(
        "li",
        {
          parentName: "ul",
        },
        mdx(
          "inlineCode",
          {
            parentName: "li",
          },
          "workLoop"
        )
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        mdx(
          "inlineCode",
          {
            parentName: "li",
          },
          "performUnitOfWork"
        )
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        mdx(
          "inlineCode",
          {
            parentName: "li",
          },
          "updateFunctionComponent"
        )
      )
    ),
    mdx(
      "p",
      null,
      "We didn\u2019t include a lot of React features and optimizations. For example, these are a few things that React does differently:"
    ),
    mdx(
      "ul",
      null,
      mdx(
        "li",
        {
          parentName: "ul",
        },
        "In Didact, we are walking the whole tree during the render phase. React instead follows some hints and heuristics to skip entire sub-trees where nothing changed."
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        "We are also walking the whole tree in the commit phase. React keeps a linked list with just the fibers that have effects and only visit those fibers."
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        "Every time we build a new work in progress tree, we create new objects for each fiber. React recycles the fibers from the previous trees."
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        "When Didact receives a new update during the render phase, it throws away the work in progress tree and starts again from the root. React tags each update with an expiration timestamp and uses it to decide which update has a higher priority."
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        "And many more\u2026"
      )
    ),
    mdx("p", null, "There are also a few features that you can add easily:"),
    mdx(
      "ul",
      null,
      mdx(
        "li",
        {
          parentName: "ul",
        },
        "use an object for the style prop"
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        mdx(
          "a",
          {
            parentName: "li",
            href: "https://github.com/pomber/didact/issues/11",
          },
          "flatten children arrays"
        )
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        "useEffect hook"
      ),
      mdx(
        "li",
        {
          parentName: "ul",
        },
        "reconciliation by key"
      )
    ),
    mdx(
      "p",
      null,
      "If you add any of these or other features to Didact send a pull request to the ",
      mdx(
        "a",
        {
          parentName: "p",
          href: "https://github.com/pomber/didact",
        },
        "GitHub repo"
      ),
      ", so others can see it."
    ),
    mdx("p", null, "Thanks for reading!"),
    mdx(
      "p",
      null,
      "And if you want to comment, like or share this post you can use this tweet:"
    ),
    mdx(
      "undefined",
      null,
      mdx(
        "blockquote",
        {
          className: "twitter-tweet",
          "data-dnt": "true",
        },
        mdx(
          "p",
          {
            parentName: "blockquote",
            lang: "en",
            dir: "ltr",
          },
          "Had to build a new blog and some tools to be able to publish this post with the format I wanted. It took some time but it's finally ready!",
          mdx("br", {
            parentName: "p",
          }),
          mdx("br", {
            parentName: "p",
          }),
          "\uD83D\uDCE2 the updated DIY guide to build React from scratch",
          mdx("br", {
            parentName: "p",
          }),
          "\u2728 ",
          mdx(
            "a",
            {
              parentName: "p",
              href: "https://t.co/RfGrl8ARYz",
            },
            "https://t.co/RfGrl8ARYz"
          ),
          " ",
          mdx(
            "a",
            {
              parentName: "p",
              href: "https://t.co/3kih0xLHIu",
            },
            "pic.twitter.com/3kih0xLHIu"
          )
        ),
        "\u2014 Rodrigo Pombo (@pomber) ",
        mdx(
          "a",
          {
            parentName: "blockquote",
            href: "https://twitter.com/pomber/status/1194616086941126656?ref_src=twsrc%5Etfw",
          },
          "November 13, 2019"
        )
      ),
      "\n\n"
    )
  );
};
MDXContent.isMDXComponent = true;
