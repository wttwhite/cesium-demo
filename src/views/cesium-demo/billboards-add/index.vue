<template>
  <div id="cesiumContainer"></div>
</template>
<script>
import {
  BillboardCollection,
  Cartesian3,
  Viewer,
  UrlTemplateImageryProvider,
  ShadowMode,
  NearFarScalar,
  Cartesian2,
  Color,
  Math,
} from 'cesium'
export default {
  name: 'billboards-add',
  data() {
    return {
      label: '新增billboard',
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
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
      this.addBillboard(scene)
    },
    addBillboard(scene) {
      const billboard = scene.primitives.add(new BillboardCollection())
      billboard.add({
        image: './Assets/Images/cesium_credit.png',
        position: Cartesian3.fromDegrees(-75.59777, 40.03883),
        // width: 1000,
        // height: 100,
        scale: 0.3, // 图片缩放
        // pixelOffset: new Cartesian2(0, -50), // 往上偏移50
        // eyeOffset: new Cartesian3(1000.0, -10000.0, 1110.0),
        scaleByDistance: new NearFarScalar(1.5e2, 10.0, 1.5e7, 0.5),
        // color: Color.YELLOW,
        color: new Color(1.0, 0, 0),
        rotation: Math.PI_OVER_FOUR, // 旋转角度
      })
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
