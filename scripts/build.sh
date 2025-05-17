# 是否需要install

echo "正在进行项目打包，请稍等..."
Re_Install="true"
if test "$Re_Install" = "true" ; then
	rm -rf node_modules pnpm-lock.yaml
	pnpm install
fi
pnpm run build
cd dist
docker cp ./ 1Panel-openresty-0yGn:/www/sites/demos.wangxiaoze.cn/index

