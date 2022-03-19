<template>
  <div>
    <ol-map
      ref="map"
      :loadTilesWhileAnimating="trueState"
      :loadTilesWhileInteracting="trueState"
      :style="{ height: '86vh' }"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>

      <!-- control -->
      <ol-fullscreen-control />
      <ol-mouseposition-control :getCoordinateFormat="position" @render="getPosition" />
      <ol-scaleline-control />
      <ol-zoom-control />
      <ol-zoomslider-control />

      <ol-vector-layer :style="vectorStyle">
        <ol-source-vector :features="zones" :projection="projection">
          <ol-interaction-draw
            v-if="store.state.drawState"
            :type="drawType"
            @drawstart="drawStart"
            @drawend="drawEnd"
            @click="setPoint"
            :stopClick="true"
          />
          <ol-interaction-modify v-if="modifyEnabled" :features="selectedFeatures">
          </ol-interaction-modify>
          <ol-interaction-snap v-if="modifyEnabled" />
        </ol-source-vector>

        <ol-style>
          <ol-style-stroke :color="`rgba(0, 153, 153, 1)`" :width="4"></ol-style-stroke>
          <ol-style-fill :color="`rgba(204, 229, 255, 0.5)`"></ol-style-fill>
        </ol-style>
      </ol-vector-layer>

      <ol-interaction-select
        @select="featureSelected"
        :condition="selectCondition"
        :features="selectedFeatures"
      >
        <ol-style>
          <ol-style-stroke color="red" :width="4"></ol-style-stroke>
          <ol-style-fill color="rgba(255,0,0,0.5)"></ol-style-fill>
        </ol-style>
      </ol-interaction-select>
    </ol-map>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import { useStore } from 'vuex'
import { Collection } from 'ol'
import { Fill, Stroke, Style } from 'ol/style'
// import axios from 'axios'
export default {
  setup() {
    const map = ref()
    const store = useStore()
    const center = ref([100.60448421058975, 13.788110114595236])
    const projection = ref('EPSG:4326')
    const zoom = ref(8)
    const rotation = ref(0)
    const trueState = ref(true)
    const drawType = ref('Polygon')
    const modifyEnabled = ref(false)

    const zones = ref([])
    const polygonPoints = ref([])

    const selectedFeatures = ref(new Collection())

    // login by admin then get all polygon in database

    // Check collapse user's polygon by showing user id

    // When user confirm to save and when user want to delete => delete that id and new polygon

    // One polygon One user

    // Geo

    const drawStart = event => {
      console.log(event)
    }
    const drawEnd = event => {
      const polygon = event.feature.values_.geometry.flatCoordinates
      var geometryPoint = []
      for (let i = 0; i < polygon.length; i = i + 2) {
        geometryPoint.push([polygon[i], polygon[i + 1]])
      }
      zones.value.push(event.feature)
      selectedFeatures.value.push(event.feature)
      var geometryJSON = JSON.stringify(geometryPoint)
      console.log(geometryJSON)
      store.dispatch('getgeometrydr', geometryJSON )
      

      // save polygon

      // axios.post('http://localhost:8081/saveGeometry', {
      //   user_id: store.state.userProfile.id,

      // })

      store.dispatch('getDrawState', false)
      modifyEnabled.value = true
    }
    const setPoint = event => {
      console.log(event)
      polygonPoints.value.push()
    }
    const selectConditions = inject('ol-selectconditions')
    const selectCondition = selectConditions.click

    function featureSelected(event) {
      modifyEnabled.value = false
      if (event.selected.length > 0) {
        modifyEnabled.value = true
      }
      selectedFeatures.value = event.target.getFeatures()
    }

    function vectorStyle() {
      const style = new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 3,
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.8)',
        }),
      })
      return style
    }
    const position = ref()
    return {
      map,
      store,
      center,
      projection,
      zoom,
      rotation,
      trueState,
      drawType,
      drawStart,
      drawEnd,
      setPoint,
      modifyEnabled,
      polygonPoints,
      selectCondition,
      featureSelected,
      vectorStyle,
      position,
    }
  },
  
  name: 'Map',
}
</script>

<style></style>
