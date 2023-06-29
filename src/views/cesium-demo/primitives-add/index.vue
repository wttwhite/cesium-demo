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
  EllipsoidSurfaceAppearance,
  Math,
  Material,
  RectangleOutlineGeometry,
  PerInstanceColorAppearance,
  ImageMaterialProperty,
} from 'cesium'
export default {
  name: 'primitives-add',
  data() {
    return {
      label: '新增primitives',
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
      const solidWhite = ColorGeometryInstanceAttribute.fromColor(Color.WHITE)
      let rectangle = Rectangle.fromDegrees(-92.0, 20.0, -56.0, 70.0)
      let rectangleInstance = new GeometryInstance({
        geometry: new RectangleGeometry({
          rectangle: rectangle,
          vertexFormat: EllipsoidSurfaceAppearance.VERTEX_FORMAT,
          stRotation: Math.toRadians(45),
        }),
      })
      const rectangleOutlineInstance = new GeometryInstance({
        geometry: new RectangleOutlineGeometry({
          rectangle: rectangle,
        }),
        attributes: {
          color: solidWhite,
        },
      })
      primitives.add(
        new Primitive({
          geometryInstances: [rectangleInstance],
          appearance: new EllipsoidSurfaceAppearance({
            // material: Material.fromType('Stripe'),
            material: Material.fromType('Color', {
              color: new Color(1.0, 0.0, 0.0, 1.0),
            }),
            // material: new Material({
            //   image: './Cesium_Logo_Color_Overlay.png',
            // }),
            // material: new ImageMaterialProperty({
            //   image: './Cesium_Logo_Color_Overlay.png',
            // }),
          }),
        })
      )
      primitives.add(
        new Primitive({
          geometryInstances: [rectangleOutlineInstance],
          appearance: new PerInstanceColorAppearance({
            flat: true, // 当 true ，在片段着色器中使用平面着色时，这意味着不考虑光照。
            translucent: false, // 当 true 时，几何体应显示为半透明，
            renderState: {
              // cesium__WEBPACK_IMPORTED_MODULE_0__.Math.min is not a function
              // lineWidth: Math.min(4.0, scene.maximumAliasedLineWidth),
            },
          }),
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
