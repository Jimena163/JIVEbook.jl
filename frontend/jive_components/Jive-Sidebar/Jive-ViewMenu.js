import { myAccFunc, createCellWithCode, createMDCellWithUI, getVarName, resolveAfterTimeout, updateAllChevrons, closeOtherAccordions } from "./jive_helpers.js"

function createAccordion(title, items, idSuffix) {
    const accButton = document.createElement("button")
    accButton.className = "jv-button jv-block jv-left-align"
    accButton.name = title
    accButton.style.display = "flex"
    accButton.style.justifyContent = "space-between"
    accButton.style.alignItems = "center"
    accButton.style.fontSize = "0.93em"
    accButton.innerHTML = `
        <span style="display:flex;align-items:center;">
            <span>${title}</span>
        </span>
        <img class="chevron" width="15" style="margin-left:auto;" src="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg" 
            data-down="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg"
            data-up="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-up-outline.svg">
    `
    const accContent = document.createElement("div")
    accContent.id = "AccView_" + idSuffix
    accContent.className = "jv-hide jv-card"
    accContent.style.boxShadow = "none"
    accContent.style.margin = "0px 0px 5px 15px"
    accContent.style.fontSize = "0.92em"

    items.forEach((item) => accContent.appendChild(item))

    accButton.onclick = function () {
        closeOtherAccordions(accContent.id, "AccProcess_")
        myAccFunc(accContent.id)
        updateAllChevrons()
    }

    const wrapper = document.createElement("div")
    wrapper.appendChild(accButton)
    wrapper.appendChild(accContent)
    return wrapper
}

function createMenuItem(text, onclick) {
    const a = document.createElement("a")
    a.href = "#"
    a.className = "jv-bar-item jv-button jv-left-align"
    a.style.fontSize = "0.93em"
    a.style.display = "flex"
    a.style.alignItems = "center"
    a.innerHTML = `<span>${text}</span>`
    a.onclick = onclick
    return a
}

export function createViewMenu(timeoutValue) {
    // Main View menu button
    const accButtonView = document.createElement("button")
    accButtonView.className = "jv-button jv-block jv-left-align"
    accButtonView.name = "View"
    accButtonView.style.display = "flex"
    accButtonView.style.justifyContent = "space-between"
    accButtonView.style.alignItems = "center"
    accButtonView.innerHTML = `
        <span style="display:flex;align-items:center;">
            <span style="font-size:0.97em;">View</span>
        </span>
        <img class="chevron" width="15" style="margin-left:auto;" src="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg"
            data-down="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg"
            data-up="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-up-outline.svg">
    `
    accButtonView.onclick = function () {
        closeOtherAccordions(accView.id)
        myAccFunc(accView.id)
        updateAllChevrons()
    }

    // Main View menu container
    const accView = document.createElement("div")
    accView.id = "AccView"
    accView.className = "jv-hide jv-card"
    accView.style.boxShadow = "none"
    accView.style.margin = "0px 0px 5px 15px"

    // 👁️ View / Display
    const viewDisplayItems = [
        createMenuItem("Zoom In", function () {}),
        createMenuItem("Zoom Out", function () {}),
        createMenuItem("Reset Zoom", function () {}),
        createMenuItem("Pan Tool", function () {}),
        createMenuItem("Fit to Cell Width", function () {}),
        createMenuItem("Fit to Original Size", function () {}),
    ]

    // 🎚️ Contrast & Intensity
    const contrastItems = [
        createMenuItem("Auto Contrast", function () {}),
        createMenuItem("Manual Contrast Sliders", function () {}),
        createMenuItem("Brightness Slider", function () {}),
        createMenuItem("Gamma Adjustment", function () {}),
        createMenuItem("Histogram View", function () {}),
        createMenuItem("Calibrate Image", async function () {
            const sel_im = getVarName("sel_im");
        
            // 1️⃣ Selección de imagen ya cargada
            createMDCellWithUI(
                "Calibrate Parameters",
                `
1. Select Image
$(@bind ${sel_im} Select([nothing, image_keys...]))
        
2. Eje horizontal
$(@bind h_val NumberField(0:0.001:10, default=0.001))
$(@bind h_unit Select(["mm", "μm"]))
        
3. Eje vertical
$(@bind v_val NumberField(0:0.1:10, default=1))
$(@bind v_unit Select(["mm", "μm"]))
        
4. Eje temporal
$(@bind t_val NumberField(0:1:100, default=1))
$(@bind t_unit Select(["s", "ms"]))
            `
            );
        
            await resolveAfterTimeout(300);
        
            // 2️⃣ Celda reactiva de calibración
            createCellWithCode(`
        using Unitful
        
        img2 = nothing
        if !isnothing(${sel_im})
            v_unit_val = v_unit == "mm" ? Unitful.mm : Unitful.μm
            h_unit_val = h_unit == "mm" ? Unitful.mm : Unitful.μm
            t_unit_val = t_unit == "s" ? Unitful.s : Unitful.ms
        
            img2 = JIVECore.Data.imCalibrate(
                image_data[${sel_im}];
                v = v_val * v_unit_val,
                h = h_val * h_unit_val,
                time = t_val * t_unit_val
            )
        end
        
        nothing  # Evita mostrar img2 automáticamente
            `);
        
            await resolveAfterTimeout(300);
        
            // 3️⃣ Celda reactiva para mostrar info de la imagen calibrada
            createCellWithCode(`
        if !isnothing(img2)
            JIVECore.Files.showInfo(img2)
        end
            `);
        }),
              
        
    ]        

    // 🌈 Colormap & Channels
    const colormapItems = [
        createMenuItem("Set Colormap (e.g., gray, viridis, magma)", function () {}),
        createMenuItem("Time Color Map", async function () {

            const sel_img = getVarName("timecolor_img");
            const sel_scheme = getVarName("timecolor_scheme");
            const show_res = getVarName("timecolor_show");
        
            const out_key = getVarName("timecolor_key");
        
            ////////////////////////////////////
            // UI
            ////////////////////////////////////
        
            createMDCellWithUI(
                "Time Color Mapping",
                `
Image stack:
$(@bind ${sel_img} Select([nothing, image_keys...]))
        
Color scheme:
$(@bind ${sel_scheme} Select([:batlowW,:batlow,:viridis,:magma,:inferno,:plasma]))

                `
            );
        
            await resolveAfterTimeout(300);
        
            ////////////////////////////////////
            // Processing
            ////////////////////////////////////
        
            createCellWithCode(`
        
        ${out_key} = nothing
        
        let
        
        if !isnothing(${sel_img})
        
            img_full = image_data[${sel_img}]
        
            ##################################
            # Detect time axis automatically
            ##################################
        
            if img_full isa JIVECore.Data.AxisArray
        
                ax = JIVECore.Data.axisnames(img_full)
        
                t_axis = findfirst(x -> lowercase(String(x)) == "time", ax)
        
                if isnothing(t_axis)
                    error("Selected image does not contain a time axis")
                end
        
                data = parent(img_full)
        
                # reorder axes so time is third
                perm = collect(1:ndims(data))
        
                perm[3], perm[t_axis] = perm[t_axis], perm[3]
        
                img = permutedims(data, perm)
        
            else
        
                img = img_full
        
            end
        
            ##################################
            # Apply time color mapping
            ##################################
        
            result = JIVECore.Data.imTimeColor(
                img,
                ${sel_scheme}
            )
        
            base_name = string(${sel_img}, "_timecolor")
        
            key = JIVECore.Data.keyCheck(image_data, base_name)
        
            image_data[key] = result
        
            if !(key in image_keys)
                push!(image_keys, key)
            end
        
            global ${out_key}
            ${out_key} = key
        
            println("Stored image: ", key)
            println("Size: ", size(result))
        
        
        end
        
        end
        
        nothing
        
        `);
        await resolveAfterTimeout(300);
        
        // 🔹 Checkbox
        createMDCellWithUI(
`$(@bind ${show_res} PlutoUI.CheckBox(default=false)) Show image`,""
        );

        await resolveAfterTimeout(300);
        
        // 🔹 Mostrar imagen
        createCellWithCode(`
    if ${show_res} && !isnothing(${out_key})
        JIVECore.Visualize.gif(
            JIVECore.Process.autoContrast(image_data[${out_key}])
        )
    end
        `);

        
        }),
        createMenuItem("Toggle Channels", function () {}),
        createMenuItem("Split Channels to Layers", function () {}),
        createMenuItem("Channel Opacity", function () {}),
        createMenuItem("Channel Order", function () {}),
    ]

    // 🪟 Slice & Dimension Control
    const sliceItems = [
        createMenuItem("Z-Slice Slider", function () {}),
        createMenuItem("Timepoint Slider (T)", function () {}),
        createMenuItem("Orthogonal Views", function () {}),
        createMenuItem("Toggle 2D / 3D View", function () {}),
    ]

    // 🏷️ Overlays & Annotations
    const overlayItems = [
        createMenuItem("Show / Hide Overlays", function () {}),
        createMenuItem("ROI Display Toggle", function () {}),
        createMenuItem("Add Annotation Layer", function () {}),
        createMenuItem("Label Transparency", function () {}),
        createMenuItem("Outline Thickness", function () {}),
    ]

    // 📐 Scale & Axes
    const scaleItems = [
        createMenuItem("Show Scale Bar", async function () {
            const ts_channels = getVarName("ts_channels");
            const ts_fontsize = getVarName("ts_fontsize");
            const ts_corner = getVarName("ts_corner");
        
            const sb1_size = getVarName("sb1_size");
            const sb1_fontsize = getVarName("sb1_fontsize");
            const sb1_corner = getVarName("sb1_corner");
            const sb1_channels = getVarName("sb1_channels");
        
            const sb2_size = getVarName("sb2_size");
            const sb2_fontsize = getVarName("sb2_fontsize");
            const sb2_corner = getVarName("sb2_corner");
            const sb2_channels = getVarName("sb2_channels");
        
            // Panel de parámetros
            createMDCellWithUI(
                "Overlays on Calibrated Image",
                `      
1. Scalebar horizontal
$(@bind sb1_size NumberField(0.001:0.001:10, default=0.05))
        
2. Scalebar vertical
$(@bind sb2_size NumberField(1:1:100, default=50))

                `
            );
        
            await resolveAfterTimeout(300);
        
            // Celda que dibuja los overlays
            createCellWithCode(`
            # Crear una copia de la imagen calibrada
            img2_copy = copy(img2)

        
        if !isnothing(img2_copy)
            # Timestamp
            JIVECore.Draw.timestamp!(
                img2,
                channels=[:h,:v,:time],
                fontsize=0.06,
                corner=:topright
            )
        
            # Scalebar horizontal
            JIVECore.Draw.scalebar!(
                img2_copy,
                sb1_size * Unitful.mm,
                fontsize=0.04,
                channels=[:h,:v],
                corner=:bottomleft,
                show_text=true
            )
        
            # Scalebar vertical
            JIVECore.Draw.scalebar!(
                img2_copy,
                sb2_size * Unitful.mm,
                direction=:v,
                fontsize=0.04,
                fcolor=(1,1,1),
                channels=[:h,:v],
                corner=:bottomleft,
                show_text=true
            )
        end
        
        nothing
            `);

            await resolveAfterTimeout(300);

            createCellWithCode(`
        if !isnothing(img2_copy)
            JIVECore.Visualize.mosaicview(img2_copy[time=1:3], nrow=1)
        end
            `);
            
        }),
        
        createMenuItem("Set Units", function () {}),
        createMenuItem("Toggle Axes", function () {}),
        createMenuItem("Change Pixel Size", function () {}),
    ]


    // Add accordions to menu
    accView.appendChild(createAccordion("👁️ Display", viewDisplayItems, "display"))
    accView.appendChild(createAccordion("🎚️ Contrast", contrastItems, "contrast"))
    accView.appendChild(createAccordion("🌈 Color", colormapItems, "color"))
    accView.appendChild(createAccordion("🪟 Slice", sliceItems, "slice"))
    accView.appendChild(createAccordion("🏷️ Overlays", overlayItems, "overlay"))
    accView.appendChild(createAccordion("📐 Axes", scaleItems, "axes"))

    

    // Add a line at the end
    const hr = document.createElement("hr")
    hr.style.margin = "12px 0 0 0"
    accView.appendChild(hr)

    // Wrap button and menu
    const itemBarView = document.createElement("div")
    itemBarView.appendChild(accButtonView)
    itemBarView.appendChild(accView)

    return itemBarView
}
