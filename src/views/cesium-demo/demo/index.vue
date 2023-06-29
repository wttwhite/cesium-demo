<template>
  <div id="cesiumContainer1"></div>
</template>

<script>
import {
  Viewer,
  UrlTemplateImageryProvider,
  ShadowMode,
  CameraEventType,
  Cartesian3,
  Math,
  Cesium3DTileset,
  Cartographic,
  Matrix4,
} from 'cesium'
export default {
  name: 'CesiumMap',
  data() {
    return {
      label: 'demo',
    }
  },
  mounted() {
    this.initMap()
  },

  methods: {
    async initMap() {
      const dom = document.getElementById('cesiumContainer1')
      dom.innerHTML && (dom.innerHTML = '')
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
        // imageryProvider: new AmapImageryProvider({
        //   url:
        //     process.env.NODE_ENV !== 'development'
        //       ? `http://66.0.0.66:18080/JXMAP/{z}/{x}/{y}.png`
        //       : 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        //   layer: 'tdtAnnoLayer',
        //   style: 'default',
        //   format: 'image/jpeg',
        //   maximumLevel: 18,
        //   tileMatrixSetID: 'GoogleMapsCompatible',
        //   crs: 'WGS84', // 坐标系: WGS84 、BD09 、GCJ02，仅百度、高德有效
        //   tilingScheme: null,
        // }),
        imageryProvider: new UrlTemplateImageryProvider({
          url: 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
          // url: 'http://192.168.2.16:8080/www/google/wx84/{z}/{x}/{y}.png',
          // url: '/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          // url: 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png',
          // url: 'http://cartodb-basemaps-c.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
          // url: 'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?sku=101Asds1IWRgC&access_token=pk.eyJ1IjoiaG91bGFpZGVsdWEiLCJhIjoiY2w4bHIwcW4zMGNwejN6cWppMW9yMWE4dSJ9.L-n07Vi12n9-Qh5108b4qg',
          // url: 'https://mt0.google.com/vt?lyrs=s&x={x}&s=&y={y}&z={z}',
          // url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
          // url: 'https://t6.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=970408ba2bb1a6c1f13b37697677dee1',
          // maximumLevel: 18,
        }),
      })
      viewer._cesiumWidget._creditContainer.style.display = 'none' // icon跳转官网隐藏
      viewer.scene.fxaa = true
      viewer.scene.postProcessStages.fxaa.enabled = true

      viewer.scene.msaaSamples = 8
      //开启深度监测
      viewer.scene.globe.depthTestAgainstTerrain = true

      //鼠标右键旋转地图
      viewer.scene.screenSpaceCameraController.tiltEventTypes = [
        CameraEventType.RIGHT_DRAG,
      ]
      // 上面还只是个球
      // 下面就到位置了
      //设置相机初始位置高度
      this.setView(viewer, 116.39123, 39.90691 - 0.005, 200)
      //加载三维数据
      this.load3dTileset(viewer, '/park/tileset.json', 28, (tileset3d) => {
        console.log('加载三维数据', tileset3d)
      })
    },
    setView(
      viewer,
      longitude = 120.74696649172107,
      latitude = 30.76754040036003,
      height = 1000,
      heading = 0,
      pitch = -30,
      roll = 0,
      duration = 1
    ) {
      if (!viewer.camera) {
        return
      }
      viewer.camera.setView({
        destination: Cartesian3.fromDegrees(
          Number(longitude),
          Number(latitude),
          height
        ),
        duration,
        orientation: {
          heading: Math.toRadians(heading),
          pitch: Math.toRadians(pitch),
          roll: Math.toRadians(roll),
        },
      })
    },
    load3dTileset(viewer, map3dUrl, low, callback) {
      if (!map3dUrl) return
      const tileset3d = new Cesium3DTileset({
        url: map3dUrl,
      })
      // 添加Cesium3DTileset 并贴地显示
      tileset3d.readyPromise
        .then((tileset) => {
          viewer.scene.primitives.add(tileset)
          this._changeHeight(low, tileset)
          callback && callback(tileset3d)
        })
        .catch((error) => {
          console.error('模型加载错误--------------------------', error)
        })
    },
    _changeHeight(height = 0, tileset) {
      height = Number(height)
      if (isNaN(height)) {
        return
      }
      let cartographic = Cartographic.fromCartesian(
        tileset.boundingSphere.center
      )

      let surface = Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        cartographic.height
      )
      let offset = Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        height
      )
      let translation = Cartesian3.subtract(offset, surface, new Cartesian3())
      tileset.modelMatrix = Matrix4.fromTranslation(translation)
    },
  },
}
</script>
<style>
#cesiumContainer .cesium-widget canvas {
  width: 800px;
  height: 800px;
}
</style>
