<template>
  <div id="cesiumContainer"></div>
</template>
<script>
import * as Cesium from 'cesium'
export default {
  name: 'model-add',
  data() {
    return {
      label: '新增model',
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
        Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNTg1Mzg0ZS03YzM1LTQyMDEtYTI3ZC00YmVlYmZkMzRmMDIiLCJpZCI6MTUwMTU2LCJpYXQiOjE2ODgwMTkzOTF9.TJwtMsnbH43jZCOgFvere_BbAdS91lMLd_KS5zc5YqI'
      const viewer = new Cesium.Viewer('cesiumContainer', {
        shouldAnimate: true,
        shadows: true,
      })
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
        -123.0744619,
        44.0503706,
        800
      ),
        orientation: {
          heading: 0.6,
          pitch: -0.66,
        },
      })
      //鼠标右键旋转地图
      viewer.scene.screenSpaceCameraController.tiltEventTypes = [
        Cesium.CameraEventType.RIGHT_DRAG,
      ]
      const scene = viewer.scene
      this.createModel(
        scene,
        './SampleData/models/CesiumAir/Cesium_Air.glb',
        500.0,
        0.0,
        Cesium.Math.toRadians(20.0),
        Cesium.Math.toRadians(-40.0),
        viewer
      )
      const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas)
      handler.setInputAction(function (movement) {
        const pick = scene.pick(movement.endPosition)
        if (
          Cesium.defined(pick) &&
          Cesium.defined(pick.node) &&
          Cesium.defined(pick.mesh)
        ) {
          console.log(`node: ${pick.node.name}. mesh: ${pick.mesh.name}`)
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    },
    async createModel(scene, url, height, heading, pitch, roll, viewer) {
      height = Cesium.defaultValue(height, 0.0)
      heading = Cesium.defaultValue(heading, 0.0)
      pitch = Cesium.defaultValue(pitch, 0.0)
      roll = Cesium.defaultValue(roll, 0.0)
      const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
      const origin = Cesium.Cartesian3.fromDegrees(
        -123.0744619,
        44.0503706,
        height
      )
      const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
        origin,
        hpr
      )
      const model = scene.primitives.add(
        // 1.106叫 Cesium.Model.fromGltfAsync
        Cesium.Model.fromGltf({
          url: url,
          modelMatrix: modelMatrix,
          minimumPixelSize: 512,
        })
      )
      model.readyPromise.then((model) => {
        console.log('this', this)
        console.log('model', model)
        this.setOption(viewer, scene, model, {
          color: 'Yellow',
          alpha: 1.0,
          colorBlendMode: 'Highlight',
          colorBlendAmount: 0.5,
        })
      })
    },
    getColorBlendMode(colorBlendMode) {
      return Cesium.ColorBlendMode[colorBlendMode.toUpperCase()]
    },
    getColor(color) {
      return Cesium.Color[color.toUpperCase()]
    },
    setOption(viewer, scene,model, viewModel) {
      model.color = Cesium.Color.fromAlpha(
        this.getColor(viewModel.color),
        Number(viewModel.alpha)
      )
      //   model.colorBlendMode = this.getColorBlendMode(viewModel.colorBlendMode)
      //   model.colorBlendAmount = Number(viewModel.colorBlendAmount)
      // Play and loop all animations at half-speed
        model.activeAnimations.addAll({
          multiplier: 0.5,
          loop: Cesium.ModelAnimationLoop.REPEAT,
        })

      const camera = viewer.camera

      //   // Zoom to model
      // 屏幕空间摄像机控制器
        const controller = scene.screenSpaceCameraController
        const r = 1.0 * model.boundingSphere.radius
        controller.minimumZoomDistance = model.boundingSphere.radius

        const center = model.boundingSphere.center
      const heading = Cesium.Math.toRadians(30.0)
      const pitch = Cesium.Math.toRadians(-20.0)
    //   camera.lookAt(
    //     center,
    //     new Cesium.HeadingPitchRange(heading, pitch, r *1.0)
    //   )
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
