<template>
  <div class="LayoutChacheli">
    <Nav />
    <div>
      <Menu />

      <slot />
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import Menu from "@/components/Menu";

export default {
  name: `LayoutDefault`,
  components: { Nav, Menu },
};
</script>
<style lang="scss">
#chachelis {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 1px solid black;
}

* {
  box-sizing: border-box;
}

/*chacheli layout*/
.chacheli-layout {
  height: 100%;
  flex: 1 1 auto;
  position: relative;
  margin: 0;
  overflow: hidden;
}
.chacheli-layout,
.chacheli-layout * {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.chacheli-layout .chacheli {
  padding: 5px;
  position: absolute;
}
.chacheli-layout .chacheli > * {
  height: 100%;
  display: inline-block;
}

#app,
body,
html {
  height: 100%;
  display: flex;
  flex-direction: column;
}
body {
  margin: 0;
  padding: 0;
}
* {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
button {
  border: 1px solid #ddd;
  border-radius: 3px;
  background: #fff;
  line-height: 20px;
}
button:hover {
  background: #f2f2f2;
  border: 1px solid #ccc;
}
.button-group button {
  border-radius: 0;
}
.button-group button[disabled] {
  background: #118fe4;
  border-color: #118fe4;
  color: #fff;
}
.button-group button:not(:first-of-type) {
  margin-left: -1px;
}
.button-group button:first-of-type {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.button-group button:last-of-type {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.chacheli-designer {
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
}
.chacheli-designer.dragging {
  cursor: move;
}
.chacheli-designer-layout {
  flex: 1 1 auto;
  position: relative;
  margin: 0;
  overflow: hidden;
}
.chacheli-designer-layout,
.chacheli-designer-layout * {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.chacheli-designer-layout .grid {
  position: absolute;
  z-index: 1;
  border-style: solid;
  border-color: #eee;
  border-width: 0 1px 1px 0;
  color: #ddd;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.chacheli-designer-layout .grid.right {
  border-right-width: 0;
}
.chacheli-designer-layout .grid.bottom {
  border-bottom-width: 0;
}
.chacheli-designer-layout .placeholder {
  position: absolute;
  z-index: 3;
  border: 1px solid #ddd;
  background-color: hsla(0, 0%, 63%, 0.1);
  transition: background-color 0.6s;
}
.chacheli-designer-layout .placeholder.invalid {
  border-color: #ffa7a7 !important;
  background-color: rgba(255, 0, 0, 0.1) !important;
}
.chacheli-designer-layout.interact.resize {
  cursor: nwse-resize;
}
.chacheli-designer-layout.interact.drag {
  cursor: move;
}
.chacheli-designer-layout.interact.dnd .placeholder {
  border-color: transparent;
  background-color: rgba(0, 255, 0, 0.1);
  transition-property: top, left, width, height, background-color;
  transition-duration: 0.4s, 0.4s, 0.4s, 0.4s, 0.6s;
}
.chacheli-designer-layout .chacheli {
  padding: 5px;
  position: absolute;
  z-index: 2;
}
.chacheli-designer-layout .chacheli .close,
.chacheli-designer-layout .chacheli .content {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.chacheli-designer-layout .chacheli .content {
  height: 100%;
  border: 1px solid #ccc;
  background: #f4f4f4;
}
.chacheli-designer-layout .chacheli .close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 23px;
  height: 23px;
  background: #fff;
  border: 1px solid #ccc;
  border-bottom-left-radius: 5px;
}
.chacheli-designer-layout .chacheli .close:after,
.chacheli-designer-layout .chacheli .close:before {
  content: "";
  position: absolute;
  height: 2px;
  top: 50%;
  left: 2px;
  right: 2px;
  margin-top: -1px;
  background: #ccc;
}
.chacheli-designer-layout .chacheli .close:before {
  transform: rotate(45deg);
}
.chacheli-designer-layout .chacheli .close:after {
  transform: rotate(-45deg);
}
.chacheli-designer-layout .chacheli .close:hover {
  background-color: hsla(0, 0%, 50%, 0.1);
}
.chacheli-designer-layout .chacheli .close:hover:after,
.chacheli-designer-layout .chacheli .close:hover:before {
  background: #999;
}
.chacheli-designer-layout .chacheli .resize-handle {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 13px;
  height: 13px;
  cursor: nwse-resize;
  border: 1px solid #ccc;
  background: #fff;
}
.chacheli-designer-layout .chacheli .resize-handle:hover {
  background-color: hsla(0, 0%, 50%, 0.1);
}
.chacheli-designer-layout.interact .chacheli {
  transition-property: top, left, width, height;
  transition-duration: 0.4s;
}
.chacheli-chooser {
  padding: 0 10px;
  border-left: 1px solid #bbb;
  flex: 0 0 200px;
  position: relative;
}
.chacheli-chooser .inner {
  /*position: absolute;*/
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 10px 0;
  overflow: auto;
}
.chacheli-chooser .chacheli-outer {
  margin: 0 0 10px;
}
.chacheli-chooser .chacheli {
  padding: 15px 10px;
  border: 1px solid #ccc;
  background: #f4f4f4;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
}
.chacheli-chooser .chacheli.dragging {
  pointer-events: none;
  position: fixed;
  z-index: 1000;
  opacity: 0.8;
}
.chacheli-layout {
  height: 100%;
  flex: 1 1 auto;
  position: relative;
  margin: 0;
  overflow: hidden;
}
.chacheli-layout,
.chacheli-layout * {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.chacheli-layout .chacheli {
  padding: 5px;
  position: absolute;
}
.chacheli-layout .chacheli > * {
  height: 100%;
  display: inline-block;
}
.chacheli-designer-control {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.chacheli-designer-control button + button {
  margin-left: -1px;
}
.chacheli-designer-control span.form {
  padding-left: 20px;
}
.number-input button {
  font-weight: 700;
}
.dummy-red {
  background-color: #f69e9e;
  width: 100%;
  height: 100%;
}
.dummy-green {
  background-color: #75c375;
  width: 100%;
  height: 100%;
}
.dummy-blue {
  background-color: #6098ce;
  width: 100%;
  height: 100%;
}
</style>

