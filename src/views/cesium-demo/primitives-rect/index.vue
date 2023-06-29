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
} from 'cesium'
export default {
  name: 'primitives-rect',
  data() {
    return {
      label: '矩形primitive',
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
      this.addPrimitives(scene)
    },
    addPrimitives(scene) {
      const primitives = scene.primitives
      const ellipsoid = scene.globe.ellipsoid
      let rectangle = Rectangle.fromDegrees(-92.0, 20.0, -86.0, 30.0)
      let center1 = Rectangle.center(rectangle)
      center1 = ellipsoid.cartographicToCartesian(center1)
      let offset = Cartesian3.multiplyByScalar(
        ellipsoid.geodeticSurfaceNormal(center1),
        100000,
        new Cartesian3()
      )
      let rectangleInstance = new GeometryInstance({
        geometry: new RectangleGeometry({
          rectangle: rectangle,
          extrudedHeight: 30000.0, // 拉伸高度
          height: 10000.0,
          vertexFormat: PerInstanceColorAppearance.VERTEX_FORMAT,
          offsetAttribute: GeometryOffsetAttribute.TOP,
        }),
        attributes: {
          color: ColorGeometryInstanceAttribute.fromColor(
            new Color(1.0, 0.0, 0.0, 0.5)
          ),
          offset: OffsetGeometryInstanceAttribute.fromCartesian3(offset),
        },
      })
      primitives.add(
        new Primitive({
          geometryInstances: [rectangleInstance],
          appearance: new PerInstanceColorAppearance({
            closed: true, // 几何体预计会闭合
          }),
          asynchronous: false,
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
