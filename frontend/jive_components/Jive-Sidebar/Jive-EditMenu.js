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
    accContent.id = "AccEdit_" + idSuffix
    accContent.className = "jv-hide jv-card"
    accContent.style.boxShadow = "none"
    accContent.style.margin = "0px 0px 5px 15px"
    accContent.style.fontSize = "0.92em"

    items.forEach((item) => accContent.appendChild(item))

    accButton.onclick = function () {
        closeOtherAccordions(accContent.id, "AccEdit_")
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

export function createEditMenu(timeoutValue) {
    // Main Edit menu button
    const accButtonEdit = document.createElement("button")
    accButtonEdit.className = "jv-button jv-block jv-left-align"
    accButtonEdit.name = "Edit"
    accButtonEdit.style.display = "flex"
    accButtonEdit.style.justifyContent = "space-between"
    accButtonEdit.style.alignItems = "center"
    accButtonEdit.innerHTML = `
        <span style="display:flex;align-items:center;">
            <span style="font-size:0.97em;">Edit</span>
        </span>
        <img class="chevron" width="15" style="margin-left:auto;" src="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg"
            data-down="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg"
            data-up="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-up-outline.svg">
    `
    accButtonEdit.onclick = function () {
        closeOtherAccordions(accEdit.id)
        myAccFunc(accEdit.id)
        updateAllChevrons()
    }

    // Main Edit menu container
    const accEdit = document.createElement("div")
    accEdit.id = "AccEdit"
    accEdit.className = "jv-hide jv-card"
    accEdit.style.boxShadow = "none"
    accEdit.style.margin = "0px 0px 5px 15px"

    // --- Submenus ---
    // Undo / Redo
    const undoItems = [
        createMenuItem("Undo Last Action", function () {}),
        createMenuItem("Redo Last Action", function () {}),
        createMenuItem("View Action History", function () {}),
        createMenuItem("Clear History", function () {}),
    ]

    // Clipboard
    const clipboardItems = [
        createMenuItem("Copy Image / Layer", function () {}),
        createMenuItem("Cut Image / Layer", function () {}),
        createMenuItem("Paste as New Layer", function () {}),
        createMenuItem("Duplicate Selection", function () {}),
        createMenuItem("Paste into ROI", function () {}),
    ]

    // Selection
    const selectionItems = [
        createMenuItem("Select All", function () {}),
        createMenuItem("Clear Selection", function () {}),
        createMenuItem("Invert Selection", function () {}),
        createMenuItem("Reselect Last", function () {}),
        createMenuItem("Save Selection as Mask", function () {}),
        createMenuItem("Load Mask as Selection", function () {}),
    ]

    // Crop & Resize
    const annotateItems = [
        createMenuItem("Crop to Selection", function () {}),
        createMenuItem("Crop to Bounding Box", function () {}),
        createMenuItem("Resize Image", function () {}),
        createMenuItem("Resize Canvas", function () {}),
        createMenuItem("Set Resolution / DPI", function () {}),
        createMenuItem("Annotate", async function () {
            const img = getVarName("annotate_image")
            const ops = getVarName("annotate_operation")
            const coords = getVarName("annotate_coords")
            const apply = getVarName("annotate_apply")
            const plot = getVarName("annotate_plot")
            const shps = getVarName("annotate_shapes")
            createCellWithCode(`${shps} = Dict()
md"""
##### Annotate
---

1. Choose image: $(@bind ${img} Select(image_keys, default=image_keys[end]) ) 
1. Select Area 
1. Choose operation: $(@bind ${ops} confirm(Select([1 => "crop", 2 => "fill", 3 => "plot"])) )

---

$(
@bind ${coords} let
    ${plot}  = create_plotly_visualizer(image_data[${img}], "heatmap")
    create_plotly_listener(${plot})
    ${plot} 
end
)
---

Apply last operation to the selected images (press Ctrl to select multiple items):

$(@bind ${apply} confirm(MultiSelect(image_keys)) )"
"""
`)
            await resolveAfterTimeout(timeoutValue)
            createCellWithCode(`record_plotly_shapes(${coords}["shape"])(${shps},${coords});`)
        }),
    ]

    // Adjust
    const adjustItems = [
        createMenuItem("Brightness / Contrast", function () {}),
        createMenuItem("Levels", function () {}),
        createMenuItem("Gamma", function () {}),
        createMenuItem("Histogram Match", function () {}),
        createMenuItem("Color Balance", function () {}),
        createMenuItem("Invert Colors", function () {}),
        // createMenuItem("Grayscale Conversion", function () {}),
        createMenuItem("Color Space & Bit Depth Conversion", async function () {

            const sel_im = getVarName("sel_im_bit");
            const colortype = getVarName("colortype");
            const bitrate = getVarName("bitrate");
            const show_info = getVarName("show_info");
            const converted_key = getVarName("converted_key");
        
            createMDCellWithUI(
                "Convert Image Bit Depth",
                `
1. Select image  
$(@bind ${sel_im} Select([nothing, image_keys...]))
        
2. Color type  
$(@bind ${colortype} Select(["gray", "rgb"]))
        
3. Bit depth  
$(@bind ${bitrate} Select([8, 16, 32, 64]))
                `
            );
        
            await resolveAfterTimeout(300);
        
            createCellWithCode(`
        ${converted_key} = nothing
        
        if !isnothing(${sel_im})
        
            # Nombre automático usando keyCheck
            base_name = string(${sel_im}, "_", ${colortype}, "_", ${bitrate}, "bit")
            key = JIVECore.Data.keyCheck(image_data, base_name)
        
            # Solo guardar si no existe
            if !(key in image_keys)
        
                img_original = copy(image_data[${sel_im}])
                img_converted = JIVECore.Data.im2bit(
                    img_original,
                    ${colortype},
                    ${bitrate}
                )
        
                image_data[key] = img_converted
                push!(image_keys, key)
        
                println("Image stored as \\"$(key)\\" ")
            end
        
            ${converted_key} = key
        end
        
        nothing
            `);
        
            await resolveAfterTimeout(300);
        
            createMDCellWithUI(
                `$(@bind ${show_info} PlutoUI.CheckBox(default=false)) Show info of converted image`, ""
            );
        
            await resolveAfterTimeout(300);
        
            createCellWithCode(`
        if ${show_info} && !isnothing(${converted_key})
            JIVECore.Files.showInfo(image_data[${converted_key}])
        end
        `);
        
        }),
        createMenuItem("Gray → LUT Mapping", async function () {

            const sel_im = getVarName("sel_im_lut");
            const scheme = getVarName("scheme_lut");
            const converted_key = getVarName("converted_key_lut");
        
            const lut_corner = getVarName("lut_corner");
            const lut_fontsize = getVarName("lut_fontsize");
        
            // ================= UI PANEL =================
        
            createMDCellWithUI(
                "Gray to LUT Color Mapping",
                `
1. Select grayscale image  
$(@bind ${sel_im} Select([nothing, image_keys...]))
        
2. Color scheme  
$(@bind ${scheme} Select(["davos","viridis","magma","plasma","inferno","cividis","nuuk"]))
        
3. Colorbar position  $(@bind ${lut_corner} Select([:topleft,:topright,:bottomleft,:bottomright]))
        
4. Colorbar fontsize  
$(@bind ${lut_fontsize} Slider(0.01:0.001:0.1, default=0.03))
            `
            );
        
            await resolveAfterTimeout(300);
        
            // ================= CONVERSION CELL =================
        
            createCellWithCode(`
                ${converted_key} = nothing
                if !isnothing(${sel_im})
                
                let
                
                    local_base = string(${sel_im}, "_", ${scheme}, "_lut")
                
                    key = JIVECore.Data.keyCheck(image_data, local_base)
                
                    if !(key in image_keys)
                
                        img_orig_local = copy(image_data[${sel_im}])
                
                        img_conv_local = JIVECore.Data.gray2lut(
                            img_orig_local,
                            Symbol(${scheme})
                        )
                
                        image_data[key] = img_conv_local
                        push!(image_keys, key)
                
                        println("Image stored as \\"$(key)\\" ")
                
                    end
                
                    global ${converted_key}
                    ${converted_key} = key
                
                end
                
                end
                
                nothing
                `);
        
            await resolveAfterTimeout(300);
        
            // ================= VISUALIZATION CELL =================
        
            createCellWithCode(`
                if !isnothing(${converted_key})

                img_lut = copy(image_data[${converted_key}])

                    JIVECore.Draw.colorbar!(
                        img_lut,
                        corner=${lut_corner},
                        fontsize=${lut_fontsize},
                        scheme=Symbol(${scheme})
                    )
        
                end
                
                `);
        
        }),
    ]

    // Transform
    const transformItems = [
        createMenuItem("Rotate (90°, 180°, arbitrary)", function () {}),
        createMenuItem("Flip (Horizontal / Vertical)", function () {}),
        createMenuItem("Warp / Perspective", function () {}),
        createMenuItem("Shear", function () {}),
        createMenuItem("Align to Reference", function () {}),
    ]

    // Layers
    const layersItems = [
        createMenuItem("Rename Layer", function () {}),
        createMenuItem("Duplicate Layer", function () {}),
        createMenuItem("Delete Layer", function () {}),
        createMenuItem("Merge Layers", function () {}),
        createMenuItem("Flatten Image", function () {}),
    ]

    // Preferences
    const preferencesItems = [
        createMenuItem("Default Output Format", function () {}),
        createMenuItem("Default Save Path", function () {}),
        createMenuItem("Autosave Settings", function () {}),
        createMenuItem("Notebook Display Options", function () {}),
        createMenuItem("Plugin Settings", function () {}),
    ]

    // Add accordions to menu
    accEdit.appendChild(createAccordion("✏️ Undo / Redo", undoItems, "undo"))
    accEdit.appendChild(createAccordion("📋 Clipboard", clipboardItems, "clipboard"))
    accEdit.appendChild(createAccordion("🔍 Selection", selectionItems, "selection"))
    accEdit.appendChild(createAccordion("🪟 Annotation", annotateItems, "annotation"))
    accEdit.appendChild(createAccordion("🎚️ Adjust", adjustItems, "adjust"))
    accEdit.appendChild(createAccordion("🧰 Transform", transformItems, "transform"))
    accEdit.appendChild(createAccordion("🖲️ Layers", layersItems, "layers"))
    accEdit.appendChild(createAccordion("⚙️ Preferences", preferencesItems, "preferences"))

    // Add a line at the end
    const hr = document.createElement("hr")
    hr.style.margin = "12px 0 0 0"
    accEdit.appendChild(hr)

    // Wrap button and menu
    const itemBarEdit = document.createElement("div")
    itemBarEdit.appendChild(accButtonEdit)
    itemBarEdit.appendChild(accEdit)

    return itemBarEdit
}
