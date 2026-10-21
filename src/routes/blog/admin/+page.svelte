<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import {
		getBlogPosts,
		saveBlogPosts,
		blogCategories,
		generatePostId,
		createSlug,
		type BlogPost
	} from '$lib/data/blog-data';
	import { marked } from 'marked';

	// États
	let isAuthenticated = $state(false);
	let password = $state('');
	let loginError = $state('');

	let posts = $state<BlogPost[]>([]);
	let editingPost = $state<BlogPost | null>(null);
	let isCreatingNew = $state(false);

	// Formulaire
	let formTitle = $state('');
	let formSlug = $state('');
	let formExcerpt = $state('');
	let formContent = $state('');
	let formCategory = $state('innovation');
	let formTags = $state('');
	let formImage = $state('');
	let formPublished = $state(true);

	// Mot de passe admin (dans un vrai projet, utilisez un backend sécurisé)
	const ADMIN_PASSWORD_HASH = 'admin123'; // À changer!

	onMount(() => {
		// Vérifier si déjà authentifié
		const auth = sessionStorage.getItem('blogAdmin');
		if (auth === 'authenticated') {
			isAuthenticated = true;
			loadPosts();
		}
	});

	function loadPosts() {
		posts = getBlogPosts();
	}

	function handleLogin() {
		if (password === ADMIN_PASSWORD_HASH) {
			isAuthenticated = true;
			sessionStorage.setItem('blogAdmin', 'authenticated');
			loadPosts();
			loginError = '';
		} else {
			loginError = 'Mot de passe incorrect';
		}
	}

	function handleLogout() {
		isAuthenticated = false;
		sessionStorage.removeItem('blogAdmin');
		password = '';
	}

	function startNewPost() {
		editingPost = null;
		formTitle = '';
		formSlug = '';
		formExcerpt = '';
		formContent = '';
		formCategory = 'innovation';
		formTags = '';
		formImage = '';
		formPublished = true;
		isCreatingNew = true;
	}

	function editPost(post: BlogPost) {
		isCreatingNew = false;
		editingPost = post;
		formTitle = post.title;
		formSlug = post.slug;
		formExcerpt = post.excerpt;
		formContent = post.content;
		formCategory = post.category;
		formTags = post.tags.join(', ');
		formImage = post.image || '';
		formPublished = post.published;
	}

	function resetForm() {
		formTitle = '';
		formSlug = '';
		formExcerpt = '';
		formContent = '';
		formCategory = 'innovation';
		formTags = '';
		formImage = '';
		formPublished = true;
		editingPost = null;
		isCreatingNew = false;
	}

	function generateSlugFromTitle() {
		if (formTitle) {
			formSlug = createSlug(formTitle);
		}
	}

	function savePost() {
		const tagsArray = formTags
			.split(',')
			.map((t) => t.trim())
			.filter((t) => t);

		if (isCreatingNew) {
			// Nouveau post
			const newPost: BlogPost = {
				id: generatePostId(),
				slug: formSlug || createSlug(formTitle),
				title: formTitle,
				excerpt: formExcerpt,
				content: formContent,
				author: 'François Provencher, Ing., M.Sc.A.',
				publishedDate: new Date().toISOString().split('T')[0],
				category: formCategory,
				tags: tagsArray,
				image: formImage || undefined,
				published: formPublished
			};
			posts = [newPost, ...posts];
		} else if (editingPost) {
			// Modifier post existant
			const editingId = editingPost.id;
			posts = posts.map((p) =>
				p.id === editingId
					? {
							...p,
							title: formTitle,
							slug: formSlug,
							excerpt: formExcerpt,
							content: formContent,
							category: formCategory,
							tags: tagsArray,
							image: formImage || undefined,
							published: formPublished,
							updatedDate: new Date().toISOString().split('T')[0]
						}
					: p
			);
		}

		saveBlogPosts(posts);
		resetForm();
	}

	function deletePost(postId: string) {
		if (confirm('Êtes-vous sûr de vouloir supprimer cet article?')) {
			posts = posts.filter((p) => p.id !== postId);
			saveBlogPosts(posts);
			if (editingPost?.id === postId) {
				resetForm();
			}
		}
	}

	function togglePublished(postId: string) {
		posts = posts.map((p) => (p.id === postId ? { ...p, published: !p.published } : p));
		saveBlogPosts(posts);
	}

	// Prévisualisation markdown
	const previewHtml = $derived(formContent ? marked(formContent) : '');
</script>

{#if !isAuthenticated}
	<!-- Login form -->
	<div class="login-container">
		<div class="login-box">
			<h1>Administration du Blog</h1>
			<p>Entrez le mot de passe pour accéder à l'interface d'administration</p>

			<form onsubmit={(e) => {
				e.preventDefault();
				handleLogin();
			}}>
				<div class="form-group">
					<label for="password">Mot de passe</label>
					<input
						type="password"
						id="password"
						bind:value={password}
						class="form-input"
						placeholder="Entrez le mot de passe"
						autofocus
					/>
				</div>

				{#if loginError}
					<div class="error-message">{loginError}</div>
				{/if}

				<button type="submit" class="btn btn-primary">Se connecter</button>
				<a href="/blog" class="btn-link">← Retour au blog</a>
			</form>
		</div>
	</div>
{:else}
	<!-- Admin interface -->
	<div class="admin-container">
		<header class="admin-header">
			<div class="header-content">
				<h1>Administration du Blog</h1>
				<div class="header-actions">
					<button class="btn btn-primary" onclick={startNewPost}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M12 5v14M5 12h14"></path>
						</svg>
						Nouvel article
					</button>
					<a href="/blog" class="btn btn-secondary">Voir le blog</a>
					<button class="btn btn-secondary" onclick={handleLogout}>Déconnexion</button>
				</div>
			</div>
		</header>

		<div class="admin-content">
			<!-- Liste des posts -->
			<aside class="posts-sidebar">
				<h2>Articles ({posts.length})</h2>
				<div class="posts-list">
					{#each posts as post}
						<div
							class="post-item"
							class:active={editingPost?.id === post.id}
							onclick={() => editPost(post)}
						>
							<div class="post-item-header">
								<h3>{post.title}</h3>
								<span class="post-status" class:published={post.published}>
									{post.published ? 'Publié' : 'Brouillon'}
								</span>
							</div>
							<div class="post-item-meta">
								<span>{post.publishedDate}</span>
								<span>•</span>
								<span>{post.category}</span>
							</div>
							<div class="post-item-actions">
								<button
									class="btn-icon"
									onclick={(e) => {
										e.stopPropagation();
										togglePublished(post.id);
									}}
									title={post.published ? 'Masquer' : 'Publier'}
								>
									{#if post.published}
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
									{:else}
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
									{/if}
								</button>
								<button
									class="btn-icon btn-danger"
									onclick={(e) => {
										e.stopPropagation();
										deletePost(post.id);
									}}
									title="Supprimer"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
								</button>
							</div>
						</div>
					{/each}
				</div>
			</aside>

			<!-- Éditeur -->
			<main class="editor-main">
				{#if isCreatingNew || editingPost}
					<div class="editor-container">
						<div class="editor-header">
							<h2>{isCreatingNew ? 'Nouvel article' : 'Modifier l\'article'}</h2>
							<button class="btn btn-secondary" onclick={resetForm}>Annuler</button>
						</div>

						<form
							class="editor-form"
							onsubmit={(e) => {
								e.preventDefault();
								savePost();
							}}
						>
							<div class="form-row">
								<div class="form-group" style="flex: 1;">
									<label for="title">Titre*</label>
									<input
										type="text"
										id="title"
										bind:value={formTitle}
										onblur={generateSlugFromTitle}
										class="form-input"
										required
									/>
								</div>
								<div class="form-group" style="flex: 1;">
									<label for="slug">Slug (URL)*</label>
									<input type="text" id="slug" bind:value={formSlug} class="form-input" required />
								</div>
							</div>

							<div class="form-group">
								<label for="excerpt">Extrait*</label>
								<textarea
									id="excerpt"
									bind:value={formExcerpt}
									class="form-textarea"
									rows="2"
									required
								></textarea>
							</div>

							<div class="form-group">
								<label for="content">Contenu (Markdown)*</label>
								<textarea
									id="content"
									bind:value={formContent}
									class="form-textarea"
									rows="15"
									required
								></textarea>
							</div>

							<div class="form-row">
								<div class="form-group">
									<label for="category">Catégorie*</label>
									<select id="category" bind:value={formCategory} class="form-select" required>
										{#each blogCategories as cat}
											<option value={cat.id}>{cat.name}</option>
										{/each}
									</select>
								</div>

								<div class="form-group" style="flex: 2;">
									<label for="tags">Tags (séparés par des virgules)</label>
									<input
										type="text"
										id="tags"
										bind:value={formTags}
										class="form-input"
										placeholder="innovation, technologie, IA"
									/>
								</div>
							</div>

							<div class="form-group">
								<label for="image">URL de l'image (optionnel)</label>
								<input type="url" id="image" bind:value={formImage} class="form-input" />
							</div>

							<div class="form-group">
								<label class="checkbox-label">
									<input type="checkbox" bind:checked={formPublished} />
									Publier immédiatement
								</label>
							</div>

							<div class="form-actions">
								<button type="submit" class="btn btn-primary">
									{isCreatingNew ? 'Créer l\'article' : 'Enregistrer les modifications'}
								</button>
								<button type="button" class="btn btn-secondary" onclick={resetForm}>Annuler</button>
							</div>
						</form>

						<!-- Prévisualisation -->
						{#if formContent}
							<div class="preview-section">
								<h3>Prévisualisation</h3>
								<div class="markdown-preview">
									{@html previewHtml}
								</div>
							</div>
						{/if}
					</div>
				{:else}
					<div class="empty-state">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="64"
							height="64"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
							<polyline points="14 2 14 8 20 8"></polyline>
							<line x1="12" y1="18" x2="12" y2="12"></line>
							<line x1="9" y1="15" x2="15" y2="15"></line>
						</svg>
						<p>Sélectionnez un article à modifier ou créez-en un nouveau</p>
					</div>
				{/if}
			</main>
		</div>
	</div>
{/if}

<style>
	/* Login styles */
	.login-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-primary-dark)) 100%);
	}

	.login-box {
		width: 100%;
		max-width: 400px;
		padding: 2rem;
		background-color: rgb(var(--bg-primary));
		border-radius: 1rem;
		box-shadow: var(--shadow-lg);
	}

	.login-box h1 {
		margin: 0 0 0.5rem 0;
		color: rgb(var(--text-primary));
		font-size: 1.75rem;
	}

	.login-box p {
		margin: 0 0 2rem 0;
		color: rgb(var(--text-secondary));
		font-size: 0.875rem;
	}

	/* Admin interface */
	.admin-container {
		min-height: 100vh;
		background-color: rgb(var(--bg-primary));
	}

	.admin-header {
		background-color: rgb(var(--bg-secondary));
		border-bottom: 1px solid rgb(var(--border-color));
		padding: 1rem 2rem;
	}

	.header-content {
		max-width: 120rem;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}

	.header-content h1 {
		margin: 0;
		font-size: 1.5rem;
		color: rgb(var(--text-primary));
	}

	.header-actions {
		display: flex;
		gap: 1rem;
	}

	.admin-content {
		max-width: 120rem;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 350px 1fr;
		min-height: calc(100vh - 5rem);
	}

	/* Sidebar */
	.posts-sidebar {
		background-color: rgb(var(--bg-secondary));
		border-right: 1px solid rgb(var(--border-color));
		padding: 1.5rem;
		overflow-y: auto;
	}

	.posts-sidebar h2 {
		margin: 0 0 1rem 0;
		font-size: 1.125rem;
		color: rgb(var(--text-primary));
	}

	.posts-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.post-item {
		padding: 1rem;
		background-color: rgb(var(--bg-primary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.post-item:hover {
		border-color: rgb(var(--color-primary));
		transform: translateX(4px);
	}

	.post-item.active {
		border-color: rgb(var(--color-primary));
		background-color: rgb(var(--color-primary) / 0.1);
	}

	.post-item-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.post-item h3 {
		margin: 0;
		font-size: 0.875rem;
		font-weight: 600;
		color: rgb(var(--text-primary));
		flex: 1;
	}

	.post-status {
		padding: 0.125rem 0.5rem;
		background-color: rgb(var(--text-muted) / 0.2);
		color: rgb(var(--text-muted));
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.post-status.published {
		background-color: rgb(34 197 94 / 0.2);
		color: rgb(34 197 94);
	}

	.post-item-meta {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		font-size: 0.75rem;
		color: rgb(var(--text-muted));
	}

	.post-item-actions {
		display: flex;
		gap: 0.5rem;
	}

	.btn-icon {
		padding: 0.25rem;
		background: none;
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.25rem;
		color: rgb(var(--text-secondary));
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn-icon:hover {
		border-color: rgb(var(--color-primary));
		color: rgb(var(--color-primary));
	}

	.btn-icon.btn-danger:hover {
		border-color: rgb(239 68 68);
		color: rgb(239 68 68);
	}

	/* Editor */
	.editor-main {
		padding: 2rem;
		overflow-y: auto;
	}

	.editor-container {
		max-width: 900px;
	}

	.editor-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rem;
	}

	.editor-header h2 {
		margin: 0;
		font-size: 1.5rem;
		color: rgb(var(--text-primary));
	}

	.editor-form {
		margin-bottom: 3rem;
	}

	.form-row {
		display: flex;
		gap: 1rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
		flex: 1;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: rgb(var(--text-primary));
		font-size: 0.875rem;
	}

	.form-input,
	.form-textarea,
	.form-select {
		width: 100%;
		padding: 0.625rem 0.875rem;
		background-color: rgb(var(--bg-secondary));
		border: 1px solid rgb(var(--border-color));
		border-radius: 0.5rem;
		color: rgb(var(--text-primary));
		font-size: 1rem;
		font-family: inherit;
		transition: border-color 0.2s ease;
	}

	.form-textarea {
		resize: vertical;
		font-family: 'Courier New', monospace;
	}

	.form-input:focus,
	.form-textarea:focus,
	.form-select:focus {
		outline: none;
		border-color: rgb(var(--color-primary));
		box-shadow: 0 0 0 3px rgb(var(--color-primary) / 0.1);
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	.checkbox-label input[type='checkbox'] {
		width: 1.25rem;
		height: 1.25rem;
		cursor: pointer;
	}

	.form-actions {
		display: flex;
		gap: 1rem;
		padding-top: 1rem;
		border-top: 1px solid rgb(var(--border-color));
	}

	/* Preview */
	.preview-section {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 2px solid rgb(var(--border-color));
	}

	.preview-section h3 {
		margin: 0 0 1rem 0;
		font-size: 1.25rem;
		color: rgb(var(--text-primary));
	}

	.markdown-preview {
		padding: 2rem;
		background-color: rgb(var(--bg-secondary));
		border-radius: 0.5rem;
		color: rgb(var(--text-primary));
		line-height: 1.7;
	}

	.markdown-preview :global(h1) {
		font-size: 2rem;
		margin-top: 0;
		margin-bottom: 1rem;
		color: rgb(var(--color-primary));
	}

	.markdown-preview :global(h2) {
		font-size: 1.5rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: rgb(var(--text-primary));
	}

	.markdown-preview :global(p) {
		margin-bottom: 1rem;
	}

	.markdown-preview :global(ul),
	.markdown-preview :global(ol) {
		margin-bottom: 1rem;
		padding-left: 2rem;
	}

	.markdown-preview :global(code) {
		padding: 0.125rem 0.375rem;
		background-color: rgb(var(--bg-tertiary));
		border-radius: 0.25rem;
		font-family: 'Courier New', monospace;
		font-size: 0.875em;
	}

	.markdown-preview :global(pre) {
		padding: 1rem;
		background-color: rgb(var(--bg-tertiary));
		border-radius: 0.5rem;
		overflow-x: auto;
		margin-bottom: 1rem;
	}

	.markdown-preview :global(pre code) {
		padding: 0;
		background: none;
	}

	/* Empty state */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
		color: rgb(var(--text-muted));
		text-align: center;
	}

	.empty-state svg {
		margin-bottom: 1rem;
	}

	.empty-state p {
		margin: 0;
		font-size: 1.125rem;
	}

	/* Buttons */
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1.25rem;
		border: none;
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s ease;
		text-decoration: none;
	}

	.btn-primary {
		background-color: rgb(var(--color-primary));
		color: white;
	}

	.btn-primary:hover {
		background-color: rgb(var(--color-primary-dark));
		transform: translateY(-1px);
	}

	.btn-secondary {
		background-color: rgb(var(--bg-tertiary));
		color: rgb(var(--text-primary));
		border: 1px solid rgb(var(--border-color));
	}

	.btn-secondary:hover {
		border-color: rgb(var(--color-primary));
	}

	.btn-link {
		display: inline-block;
		margin-top: 1rem;
		color: rgb(var(--color-primary));
		text-decoration: none;
		font-size: 0.875rem;
	}

	.error-message {
		padding: 0.75rem;
		background-color: rgb(239 68 68 / 0.1);
		color: rgb(239 68 68);
		border-radius: 0.5rem;
		margin-bottom: 1rem;
		font-size: 0.875rem;
	}
</style>
