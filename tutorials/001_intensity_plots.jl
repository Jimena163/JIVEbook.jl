### A JIVEbook.jl notebook ###
# v0.0.2

using Markdown
using InteractiveUtils
using JIVECore
using PlutoPlotly, PlutoUI
import Main.PlutoRunner.JIVECore.Data.image_data as image_data
import Main.PlutoRunner.JIVECore.Data.image_keys as image_keys

# ╔═╡ 7afcb171-70a9-45c7-90ba-8890c4520aad
pwd()

# ╔═╡ ea5ae230-029b-48a0-ac58-c829884d6ed3
JIVECore.Visualize.jive_theme()

# ╔═╡ 8817386e-8d1e-4ee4-8816-1a69564e8092
img = JIVECore.Files.loadImage("/Users/yi/JIVE/Demo Images/Widefield Images/Fluorescence Measurment/Fluoro 01.tif")


# ╔═╡ e3c92d34-6d33-4c28-8d8f-51f0cf6ff785
using Colors
img_rgb = RGB.(img)   # convierte Gray → RGB

# ╔═╡ 521ce64a-4407-4ef4-a0f7-256ead09add9
img[:,:,:]

# ╔═╡ 64d6224d-249f-4428-a610-7ccd7c74822d
size(img)

# ╔═╡ d4ab434d-83f3-47de-a81c-3291d153dcd5
JIVECore.Visualize.plotLine(img, (100, 100), (200, 200), legend=true)

# ╔═╡ 7f22d8c0-a7a0-4100-bc53-30ca528488b0
JIVECore.Draw.draw_line(img_rgb, (100, 100), (200, 200), value=(1,1,1))

# ╔═╡ 00000000-0000-0000-0000-000000000001
PLUTO_PROJECT_TOML_CONTENTS = """
[deps]
Colors = "5ae59095-9a9b-59fe-a467-6f913c188581"

[compat]
Colors = "~0.13.1"
"""

# ╔═╡ 00000000-0000-0000-0000-000000000002
PLUTO_MANIFEST_TOML_CONTENTS = """
# This file is machine-generated - editing it directly is not advised

julia_version = "1.11.5"
manifest_format = "2.0"
project_hash = "abb35959cc261a37e72a093889f694d50a8cb09e"

[[deps.Artifacts]]
uuid = "56f22d72-fd6d-98f1-02f0-08ddc0907c33"
version = "1.11.0"

[[deps.ColorTypes]]
deps = ["FixedPointNumbers", "Random"]
git-tree-sha1 = "67e11ee83a43eb71ddc950302c53bf33f0690dfe"
uuid = "3da002f7-5984-5a60-b8a6-cbb66c0b333f"
version = "0.12.1"

    [deps.ColorTypes.extensions]
    StyledStringsExt = "StyledStrings"

    [deps.ColorTypes.weakdeps]
    StyledStrings = "f489334b-da3d-4c2e-b8f0-e476e12c162b"

[[deps.Colors]]
deps = ["ColorTypes", "FixedPointNumbers", "Reexport"]
git-tree-sha1 = "37ea44092930b1811e666c3bc38065d7d87fcc74"
uuid = "5ae59095-9a9b-59fe-a467-6f913c188581"
version = "0.13.1"

[[deps.CompilerSupportLibraries_jll]]
deps = ["Artifacts", "Libdl"]
uuid = "e66e0078-7015-5450-92f7-15fbd957f2ae"
version = "1.1.1+0"

[[deps.FixedPointNumbers]]
deps = ["Statistics"]
git-tree-sha1 = "05882d6995ae5c12bb5f36dd2ed3f61c98cbb172"
uuid = "53c48c17-4a7d-5ca2-90c5-79b7896eea93"
version = "0.8.5"

[[deps.Libdl]]
uuid = "8f399da3-3557-5675-b5ff-fb832c97cbdb"
version = "1.11.0"

[[deps.LinearAlgebra]]
deps = ["Libdl", "OpenBLAS_jll", "libblastrampoline_jll"]
uuid = "37e2e46d-f89d-539d-b4ee-838fcccc9c8e"
version = "1.11.0"

[[deps.OpenBLAS_jll]]
deps = ["Artifacts", "CompilerSupportLibraries_jll", "Libdl"]
uuid = "4536629a-c528-5b80-bd46-f80d51c5b363"
version = "0.3.27+1"

[[deps.Random]]
deps = ["SHA"]
uuid = "9a3f8284-a2c9-5f02-9a11-845980a1fd5c"
version = "1.11.0"

[[deps.Reexport]]
git-tree-sha1 = "45e428421666073eab6f2da5c9d310d99bb12f9b"
uuid = "189a3867-3050-52da-a836-e630ba90ab69"
version = "1.2.2"

[[deps.SHA]]
uuid = "ea8e919c-243c-51af-8825-aaa63cd721ce"
version = "0.7.0"

[[deps.Statistics]]
deps = ["LinearAlgebra"]
git-tree-sha1 = "ae3bb1eb3bba077cd276bc5cfc337cc65c3075c0"
uuid = "10745b16-79ce-11e8-11f9-7d13ad32a3b2"
version = "1.11.1"

    [deps.Statistics.extensions]
    SparseArraysExt = ["SparseArrays"]

    [deps.Statistics.weakdeps]
    SparseArrays = "2f01184e-e22b-5df5-ae63-d93ebab69eaf"

[[deps.libblastrampoline_jll]]
deps = ["Artifacts", "Libdl"]
uuid = "8e850b90-86db-534c-a0d3-1478176c7d93"
version = "5.11.0+0"
"""

# ╔═╡ Cell order:
# ╠═7afcb171-70a9-45c7-90ba-8890c4520aad
# ╠═ea5ae230-029b-48a0-ac58-c829884d6ed3
# ╠═8817386e-8d1e-4ee4-8816-1a69564e8092
# ╠═521ce64a-4407-4ef4-a0f7-256ead09add9
# ╠═64d6224d-249f-4428-a610-7ccd7c74822d
# ╠═d4ab434d-83f3-47de-a81c-3291d153dcd5
# ╠═e3c92d34-6d33-4c28-8d8f-51f0cf6ff785
# ╠═7f22d8c0-a7a0-4100-bc53-30ca528488b0
# ╟─00000000-0000-0000-0000-000000000001
# ╟─00000000-0000-0000-0000-000000000002
