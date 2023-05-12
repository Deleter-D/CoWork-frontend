<template>
  <va-tabs
    v-model="currentActiveTab"
    style="width: 20vw;height: 7vh"
    color="#008F8C"
    left>
    <template #tabs>
      <va-tab
        v-for="tab in ['我创建的', '我参与的']"
        :key="tab"
        color="#008F8C">
        {{ tab }}
      </va-tab>
    </template>
  </va-tabs>

  <div v-if="currentActiveTab===0" class="table">
    <div>
      <va-data-table
        :columns="columns"
        :items="teamCreated"
        clickable
        @row:click="openTeamDetails"/>
    </div>
    <va-modal
      v-model="showTeamDetails"
      blur
      class="teamDetailModal">
      <template #content>
        <va-card-title>团队详情</va-card-title>
        <va-card-content>
          <va-form>
            <div class="mb-4">
              <span class="teamDetailFont">团队名称：</span>
              <va-input
                v-model="teamDetails.teamName"
                :disabled="isTeamDetailsEditDisabled"/>
            </div>
            <div class="mb-4">
              <span class="teamDetailFont">团队描述：</span>
              <va-input
                v-model="teamDetails.teamDescription"
                :disabled="isTeamDetailsEditDisabled"
                type="textarea"/>
            </div>
            <div class="mb-4">
              <span class="teamDetailFont">创建时间：</span>{{ teamDetails.createTime }}
            </div>
            <div class="mb-4">
              <span class="teamDetailFont">修改时间：</span>{{ teamDetails.updateTime }}
            </div>
          </va-form>
          <span class="teamDetailFont">
          团队成员：
          <va-button
            color="#008F8C"
            size="small"
            round
            @click="addTeamMember">
            添加成员
          </va-button>
        </span>
          <va-data-table
            :columns="teamMemberColumns"
            :items="teamDetails.teamMembers">
          </va-data-table>
        </va-card-content>
        <va-card-actions>
          <va-button color="#008F8C" @click="editTeamDetails">编辑</va-button>
          <va-button color="#008F8C" :disabled="isTeamDetailsSaveButtonDisabled" @click="saveTeamDetails">保存
          </va-button>
          <va-button color="#008F8C" @click="closeTeamDetails">关闭</va-button>
        </va-card-actions>
      </template>
    </va-modal>
  </div>
  <div v-if="currentActiveTab===1">
    <div class="table">
      <va-data-table
        :columns="columns"
        :items="teamJoined"
        clickable
        @row:click="openTeamDetails"/>
    </div>
    <va-modal
      v-model="showTeamDetails"
      blur
      class="teamDetailModal">
      <template #content="{ ok }">
        <va-card-title>团队详情</va-card-title>
        <va-card-content>
          <va-form>
            <div class="mb-4">
              <span class="teamDetailFont">团队名称：</span>{{ teamDetails.teamName }}
            </div>
            <div class="mb-4">
              <span class="teamDetailFont">团队描述：</span>{{ teamDetails.teamDescription }}
            </div>
            <div class="mb-4">
              <span class="teamDetailFont">创建时间：</span>{{ teamDetails.createTime }}
            </div>
            <div class="mb-4">
              <span class="teamDetailFont">修改时间：</span>{{ teamDetails.updateTime }}
            </div>
          </va-form>
          <span class="teamDetailFont">团队成员：</span>
          <va-data-table
            :columns="teamMemberColumns"
            :items="teamDetails.teamMembers">
          </va-data-table>
        </va-card-content>
        <va-card-actions>
          <va-button color="#008F8C" @click="ok">关闭</va-button>
        </va-card-actions>
      </template>
    </va-modal>
  </div>
</template>

<script>

import { get, patch } from '@/utils/axiosUtil'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Team',
  data () {
    return {
      columns: [
        {
          key: 'id',
          label: '团队ID'
        },
        {
          key: 'teamName',
          label: '团队名称'
        },
        {
          key: 'teamSize',
          label: '团队人数'
        },
        {
          key: 'createTime',
          label: '创建时间'
        }
      ],
      teamCreated: [],
      teamJoined: [],
      showTeamDetails: false,
      teamDetails: [],
      isTeamDetailsEditDisabled: true,
      isTeamDetailsSaveButtonDisabled: true,
      teamMemberColumns: [
        {
          key: 'username',
          label: '用户名'
        },
        {
          key: 'phoneNumber',
          label: '手机号码'
        }
      ],
      currentActiveTab: 0
    }
  },
  methods: {
    openTeamDetails (event) {
      this.showTeamDetails = true
      this.teamDetails = event.item
    },
    saveTeamDetails () {
      patch('/team/team/' + this.teamDetails.id, {
        teamName: this.teamDetails.teamName,
        teamDescription: this.teamDetails.teamDescription,
        token: this.$store.getters.GET_TOKEN
      }).then((res) => {
        if (res.data.code === 2201) {
          this.isTeamDetailsEditDisabled = true
          this.isTeamDetailsSaveButtonDisabled = true
        }
        this.$vaToast.init({
          message: '保存成功！',
          color: '#015958'
        })
      })
    },
    closeTeamDetails () {
      this.showTeamDetails = false
      this.isTeamDetailsEditDisabled = true
      this.isTeamDetailsSaveButtonDisabled = true
    },
    editTeamDetails () {
      this.isTeamDetailsEditDisabled = false
      this.isTeamDetailsSaveButtonDisabled = false
    },
    addTeamMember () {
      // TODO
    }
  },
  beforeMount () {
    get('/team/team', {
      params: {
        token: this.$store.getters.GET_TOKEN
      }
    }).then((res) => {
      this.teamCreated = res.data.data
      for (let i = 0; i < this.teamCreated.length; i++) {
        const teamSize = this.teamCreated[i].teamMembers.length + 1
        this.teamCreated[i].teamSize = teamSize
      }
    })

    get('/team/team/joined', {
      params: {
        token: this.$store.getters.GET_TOKEN
      }
    }).then((res) => {
      this.teamJoined = res.data.data
      for (let i = 0; i < this.teamJoined.length; i++) {
        const teamSize = this.teamJoined[i].teamMembers.length + 1
        this.teamJoined[i].teamSize = teamSize
      }
    })
  }
}
</script>

<style scoped>
.table {
  width: 80vw;
  position: relative;
  left: 2vw;
}

.teamDetailFont {
  font-family: "Arial Black";
  font-weight: bold;
}

.teamDetailModal {
  width: 30vw;
}
</style>
