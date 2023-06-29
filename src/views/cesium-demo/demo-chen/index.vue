<template>
  <div id="cesiumContainer"></div>
</template>
<script>
import {
  ColorGeometryInstanceAttribute,
  Primitive,
  Viewer,
  UrlTemplateImageryProvider,
  ShadowMode,
  GeometryInstance,
  Rectangle,
  Color,
  RectangleGeometry,
  GeometryOffsetAttribute,
  Cartesian3,
  PerInstanceColorAppearance,
  OffsetGeometryInstanceAttribute,
  Cesium3DTileset,
  IonResource,
  Ion} from 'cesium'
export default {
  name: 'demo-chen',
  data() {
    return {
      label: 'demo-chen',
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNTg1Mzg0ZS03YzM1LTQyMDEtYTI3ZC00YmVlYmZkMzRmMDIiLCJpZCI6MTUwMTU2LCJpYXQiOjE2ODgwMTkzOTF9.TJwtMsnbH43jZCOgFvere_BbAdS91lMLd_KS5zc5YqI'
      const viewer = new Viewer('cesiumContainer', {
        shouldAnimate: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        creditsDisplay: false,
        timeline: false,
        fullscreenButton: false,
        infoBox: false,
        selectionIndicator: false,
        scene3DOnly: true,
        shadows: true,
        terrainShadows: ShadowMode.ENABLED,
        imageryProvider: new UrlTemplateImageryProvider({
          url: 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
        }),
      })
      const scene = viewer.scene
      viewer.camera.setView({
        destination: new Cartesian3(1332761, -4662399, 4137888),
        orientation: {
          heading: 0.6,
          pitch: -0.66,
        },
      })
      scene.primitives.add(
        new Cesium3DTileset({
          url: IonResource.fromAssetId(96188),
        })
      )
    },
  },
}
</script>
<style lang="scss">
#cesiumContainer .cesium-widget canvas {
  width: 800px;
  height: 800px;
}
</style>
