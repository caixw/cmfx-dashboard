<template>
    <n-grid cols="12" responsive="screen" item-responsive class="card">
        <n-grid-item span="12 s:8 m:6 xl:4" offset="0 s:2 m:3 xl:4">
            <n-card :title="$t('common.login')" :segmented="{content: true}">
                <template #header-extra>
                    <x-theme-selector />&#160;<x-locale-selector />
                </template>
                <n-form :model="account" :rules="rules">
                    <n-form-item :label="$t('common.username')" path="username">
                        <n-input v-model:value="account.username">
                            <template #prefix>
                                <n-icon>
                                    <account-circle-filled />
                                </n-icon>
                            </template>
                        </n-input>
                    </n-form-item>

                    <n-form-item :label="$t('common.password')" path="password">
                        <n-input type="password" v-model:value="account.password" show-password-on="click">
                            <template #prefix>
                                <n-icon>
                                    <password-filled />
                                </n-icon>
                            </template>
                        </n-input>
                    </n-form-item>
                </n-form>

                <template #action>
                    <n-space justify="space-between">
                        <n-button icon-placement="left" attr-type="reset" @click="reset">
                            {{$t('common.reset')}}
                            <template #icon>
                                <n-icon>
                                    <clear-filled />
                                </n-icon>
                            </template>
                        </n-button>
                        <n-button type="primary" attr-type="submit" icon-placement="right" @click="login">
                            {{$t('common.login')}}
                            <template #icon>
                                <n-icon>
                                    <navigate-next-filled />
                                </n-icon>
                            </template>
                        </n-button>
                    </n-space>
                </template>
            </n-card>
        </n-grid-item>
    </n-grid>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
    NGrid, NGridItem, NCard, NButton, NSpace, NIcon,
    NForm, NFormItem, NInput, FormRules
} from 'naive-ui';
import { NavigateNextFilled, ClearFilled, AccountCircleFilled, PasswordFilled } from '@vicons/material';
import { useI18n } from 'vue-i18n';

import { useCmfx } from '@/pages/app/cmfx';
import { XThemeSelector } from '@/components/theme-selector';
import { XLocaleSelector } from '@/components/locale-selector';

const $cmfx = useCmfx();
const $i18n = useI18n();
const $router = useRouter();

const account = ref<Account>({ username: '', password: '' });

const rules: FormRules = {
    username: [
        {
            required: true,
            renderMessage: ()=> {return $i18n.t('common.required');},
            trigger: ['blur', 'input']
        }
    ],
    password: [
        {
            required: true,
            renderMessage: ()=> {return $i18n.t('common.required');},
            trigger: ['blur', 'input']
        }
    ]
};

const reset = () => {
    account.value.username = '';
    account.value.password = '';
};

const login = async () => {
    const ok = await $cmfx.login(account.value);
    if (ok) {
        $router.push({name: $cmfx.options.presetPage });
    }
};

onMounted(()=>{
    $cmfx.setTitle($i18n.t('common.login'));
});

interface Account {
    username: string
    password: string
}
</script>

<style scoped>
.card {
    margin-top: 100px;
}
</style>

