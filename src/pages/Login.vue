<template>
    <n-grid cols="12" responsive="screen" :item-responsive="true" class="card">
        <n-grid-item span="12 m:8 l:6 xl:4" offset="0 m:2 l:3 xl:4">
            <n-card :title="$t('message.login')">
                <n-form :model="account" :rules="rules" ref="form">
                    <n-form-item :label="$t('message.username')" path="username">
                        <n-input v-model:value="account.username">
                            <template #prefix>
                                <n-icon>
                                    <account-circle-filled />
                                </n-icon>
                            </template>
                        </n-input>
                    </n-form-item>

                    <n-form-item :label="$t('message.password')" path="password">
                        <n-input type="password" v-model:value="account.password">
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
                        <n-button icon-placement="left" @click="reset">
                            {{$t('message.reset')}}
                            <template #icon>
                                <n-icon>
                                    <clear-filled />
                                </n-icon>
                            </template>
                        </n-button>
                        <n-button type="primary" icon-placement="right" @click="login">
                            {{$t('message.login')}}
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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
    NGrid, NGridItem, NCard, NButton, NSpace, NIcon,
    NForm, NFormItem, NInput, FormRules, FormValidationError, FormInst
} from 'naive-ui';
import { NavigateNextFilled, ClearFilled, AccountCircleFilled, PasswordFilled } from '@vicons/material';
import { useI18n } from 'vue-i18n';

import { useCmfx } from '@/plugins/cmfx';

export default defineComponent({
    components: {
        NGrid, NGridItem, NCard, NButton, NSpace, NIcon,
        NavigateNextFilled, ClearFilled, AccountCircleFilled, PasswordFilled,
        NForm, NFormItem, NInput
    },

    setup() {
        const $cmfx = useCmfx();
        const {t,locale} = useI18n();
        locale.value = 'zh-TW';

        const form = ref<FormInst | null>(null);
        const account = ref<Account>({ username: '', password: '' });

        const rules: FormRules = {
            username: [
                {
                    required: true,
                    message: t('message.required'),
                    trigger: ['blur', 'input']
                }
            ],
            password: [
                {
                    required: true,
                    message: t('message.required'),
                    trigger: ['blur', 'input']
                }
            ]
        };

        const reset = () => {
            account.value.username = '';
            account.value.password = '';
        };

        const login = () => {
            const p = (new Promise((resolve, reject) => {
                form?.value?.validate((errs?: FormValidationError[]) => {
                    if (errs && errs.length > 0) {
                        reject('无法验证输入的信息');
                    } else {
                        resolve(true);
                    }
                });
            }));

            p.then(() => {
                return $cmfx.login(account.value);
            }).catch((reason) => {
                console.error(reason);
            });
        };

        return { form, account, rules, login, reset };
    },
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

